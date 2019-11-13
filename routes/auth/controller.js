const mongoose      = require('mongoose');
const jwt           = require('jsonwebtoken');
const now           = require('moment-timezone')().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
const sgMail        = require('@sendgrid/mail');
const path          = require('path');
const ejs           = require('ejs');
const fs            = require('fs');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const UsersModel = require('../../models/Users');
const { 
    success_created, 
    client_error_not_allowed, 
    client_error_not_acceptable 
} = require('../../utils/responser')

exports._addUserToDB = data => {
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

    const sendEmailVerification = (to, token) => {
        let emailPath = path.join(__dirname, '..', '..', 'templates', 'confirmation_email', 'html.ejs')
        let emailDir  = fs.readFileSync(emailPath, { encoding: 'utf-8' })
        let emailTemplate = ejs.render(emailDir)
        console.log(emailTemplate)

        let msg = {
            to: `${to}`,
            from: 'muhammadfuadwork@gmail.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: emailTemplate
        }

        return sgMail.send(msg, (err, result) => {
            if(err) {
                console.log(err)
            } else {
                console.log(result)
            }
        })
    }

    const result = registeredUser.save()
      .then(res => {
          const token = jwt.sign({
              email: data.email,
              userId: res._id
          }, process.env.JWT_KEY, { expiresIn: "3h" })

          const dataPayload = {
              user_id: res._id,
              token: token
          }

          sendEmailVerification(data.email)

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