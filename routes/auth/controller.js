const mongoose = require('mongoose');
const AuthModel = require('./model');

exports._addUserToDB = data => {
    const registeredUser = new AuthModel({
        firstname: data.firstname,
        lastname: data.lastname,
        auth: {
            email: data.email,
            password: data.password
        },
        gender: data.gender,
        avatar: data.avatar
    })

    const result = registeredUser.save()
      .then(res => {
          return res
      })
      .catch(err => {
          return err
      })
    
    return result
}