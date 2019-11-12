const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const now = require('moment-timezone')().tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss")
const UsersModel = require('../../models/Users');

const { success_created, client_error_not_allowed, client_error_not_acceptable } = require('../../utils/responser')

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

    const result = registeredUser.save()
      .then(res => {
          const token = jwt.sign({
              email: data.email,
              userId: res._id
          }, "test_password", { expiresIn: "3h" })

          const dataPayload = {
              user_id: res._id,
              token: token
          }

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