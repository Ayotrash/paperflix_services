const jwt    = require('jsonwebtoken');
const now    = require('moment-timezone')().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
const sgMail = require('@sendgrid/mail');
const path   = require('path');
const ejs    = require('ejs');
const fs     = require('fs');
const { createModel }     = require('mongoose-gridfs');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const UsersModel = require('../../models/Users');
const { 
    success_created, 
    success_accepted,
    client_error_not_allowed, 
    client_error_not_acceptable,
    server_error_internal
} = require('../../utils/responser')

exports._register = data => {
    const registeredUser = new UsersModel({
        firstname: data.firstname,
        lastname: data.lastname,
        auth: {
            email: data.email,
            password: data.password
        },
        gender: data.gender,
        avatar: data.avatar,
        logged_devices: [{
            logged_in: {
                is_logged: true,
                logged_at: now
            },
            device_info: data.device_info
        }]
    })

    const sendEmailVerification = (userData, token) => {
        let emailPath = path.join(__dirname, '..', '..', 'templates', 'confirmation_email', 'html.ejs')
        let emailDir  = fs.readFileSync(emailPath, { encoding: 'utf-8' })
        let emailTemplate = ejs.render(emailDir, { firstname: userData.firstname, token: `http://localhost:3000/v1/verify?token=${token}` })

        let msg = {
            to: `${userData.email}`,
            from: 'muhammadfuadwork@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: emailTemplate
        }

        return sgMail.send(msg, (err, result) => {
            if(err) {
                console.log(err)
            } else {
                /* console.log(result) */
                return
            }
        })
    }

    const result = registeredUser.save()
      .then(res => {
          const registerToken = jwt.sign({
              email: data.email,
              userId: res._id
          }, process.env.JWT_KEY, { expiresIn: "3h" })

          const verifyAccountToken = jwt.sign({
              email: data.email,
              userId: res._id
          }, process.env.JWT_KEY, { expiresIn: "1h" })

          const dataPayload = {
              user_id: res._id,
              token: registerToken
          }

          sendEmailVerification(data, verifyAccountToken)

          return success_created(
              `Welcome ${res.firstname}, don't forget to confirmation your email.`,
              dataPayload
          )
      })
      .catch(err => {
          if(err.errors.firstname) {
              return client_error_not_allowed("First name is required.")
          } else if(err.errors.lastname) {
              return client_error_not_allowed("Last name is required.")
          } else if(err.errors.email) {
              return client_error_not_allowed("Email is required.")
          } else if(err.errors.password) {
              return client_error_not_allowed("Password is required.")
          } else if(err.errors.gender) {
              return client_error_not_allowed("Gender is required.")
          } else if(err.errors["auth.email"]) {
              return client_error_not_acceptable(`${err.errors["auth.email"].value} has already exist.`)
          }

          return err
      })
    
    return result
}

exports._verify = token => {
    console.log("Calling verify!")

    const checkToken = () => {
        let decoded = jwt.verify(token, process.env.JWT_KEY, function(err, res) {
            if(err) {
                return err
            } else {
                return res
            }
        })

        return decoded
    }

    const tokenChecked = checkToken()

    if (tokenChecked.name == "TokenExpiredError") {
        return client_error_not_allowed('Token expired.')
    } else {
        let finalResult = UsersModel.findByIdAndUpdate(
            tokenChecked.userId,
            { is_verified: true },
            { new: true }
        )
        .then(response => {
            let dataPayload = {
                is_verified: response.is_verified
            }
            return success_accepted('You have been verified your email.', dataPayload)
        })
        .catch(error => {
            return client_error_not_allowed('Error')
        })

        return finalResult
    }
}

exports._logout = (userId, deviceId) => {
    const finalResult = UsersModel.findOneAndUpdate(
        { "_id": userId, "logged_devices._id": deviceId  },
        { "$set": { "logged_devices.$.logged_in.is_logged": false } },
        { new: true }
    )
    .then(response => {
        return success_accepted(`Success logged out from device id: ${deviceId}`, null)
    })
    .catch(error => {
        console.log(error)
        return server_error_internal("We're sorry, you can't log out right now because internal server error.")
    })

    return finalResult
}

exports._uploadImageTest = file => {
    res.send('Test upload image.')
}