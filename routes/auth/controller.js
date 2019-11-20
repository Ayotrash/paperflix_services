const jwt    = require('jsonwebtoken');
const now    = require('moment-timezone')().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
const sgMail = require('@sendgrid/mail');
const path   = require('path');
const ejs    = require('ejs');
const fs     = require('fs');
const bcrypt = require('bcrypt');
const _      = require('lodash')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const UsersModel = require('../../models/Users');
const { 
    success_created, 
    success_accepted,
    client_error_not_allowed, 
    client_error_not_acceptable,
    client_error_conflict,
    server_error_internal
} = require('../../utils/responser')

exports._register = data => {
    const hashingPassword = bcrypt.hashSync(data.password, 10);

    const registeredUser = new UsersModel({
        firstname: data.firstname,
        lastname: data.lastname,
        auth: {
            email: data.email,
            password: hashingPassword
        },
        gender: data.gender,
        avatar: data.avatar,
        logged_devices: [{
            is_logged: true,
            logged_at: now,
            device_name: data.device_name,
            device_id: data.device_id
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
              return client_error_not_acceptable("First name is required.")
          } else if(err.errors.lastname) {
              return client_error_not_acceptable("Last name is required.")
          } else if(err.errors.email) {
              return client_error_not_acceptable("Email is required.")
          } else if(err.errors.password) {
              return client_error_not_acceptable("Password is required.")
          } else if(err.errors.gender) {
              return client_error_not_acceptable("Gender is required.")
          } else if(err.errors["auth.email"]) {
              return client_error_conflict(`${err.errors["auth.email"].value} has already exist.`)
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
        { "$set": { "logged_devices.$.is_logged": false } },
        { new: true }
    )
    .then(response => {
        return success_accepted(`Success logged out from device id: ${deviceId}`, null)
    })
    .catch(error => {
        console.log(error)
        return server_error_internal("Internal server error.")
    })

    return finalResult
}

exports._login = data => {
    const returnedToken = UsersModel.findOne({
        "auth.email": data.email 
    })
    .then(response => {
        if (response == null) {
            return client_error_not_allowed('Not found')
        }
        
        const comparedPassword = bcrypt.compareSync(data.password, response.auth.password)

        if (!comparedPassword) {
            return client_error_not_allowed('Wrong email or password.')
        } else {
            const checkedDevices = _.find(response.logged_devices, { 'device_id': data.device_id })
            
            if (checkedDevices) {
                console.log('Update is_logged to TRUE')
            } else {
                console.log('Added new device to DB')
            }
            
            return success_accepted('You are log in.', response)
        }
    })
    .catch(error => {
        return server_error_internal('Internal server error.')
    })

    return returnedToken
}