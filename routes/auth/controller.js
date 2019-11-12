const mongoose = require('mongoose');
const AuthModel = require('./model');

const { success_created, client_error_not_allowed, client_error_not_acceptable } = require('../../utils/responser')

exports._addUserToDB = data => {
    const registeredUser = new AuthModel({
        firstname: data.firstname,
        lastname: data.lastname,
        auth: {
            email: data.email,
            password: data.password
        },
        gender: data.gender,
        avatar: data.avatar,
        device_info: data.device_info
    })

    const result = registeredUser.save()
      .then(res => {
          return success_created(
              `Welcome ${res.firstname}, don't forget to confirmation your email.`,
              res._id
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