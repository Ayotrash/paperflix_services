const express = require('express');
const Promise = require('bluebird');

var router = express.Router();
/* const { singleUpload } = require('../../config/mongodb-storage-connection') */

const { _register, _verify, _logout, _uploadAvatar } = require('./controller');
const { success_created } = require('../../utils/responser')

router.post('/register', function(req, res, next) {
    Promise.try(() => {
        const userAdded = _register(req.body)
        return userAdded
    })
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => res.send(error))
})

router.get('/verify', function(req, res, next) {
    Promise.try(() => {
        const verified = _verify(req.query.token)
        return verified
    })
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => res.send(error))
})

router.put('/logout', function(req, res, next) {
    Promise.try(() => {
        const loggedOut = _logout(req.query.userId, req.query.deviceId)
        return loggedOut
    })
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => res.send(error))
})

router.post('/avatar', _uploadAvatar.single('avatar'), function(req, res, next) {
    Promise.try(() => {
        const uploadedAvatar = req.file
        console.log(req.file)
        return success_created('Success upload', uploadedAvatar)
    })
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => res.send(error))
})

module.exports = router;