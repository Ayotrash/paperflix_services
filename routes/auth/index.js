const express = require('express');
const Promise = require('bluebird');

var router = express.Router();

const upload = require('../../utils/uploadFIleMiddleware');
const { _register, _verify, _logout, _login, _forgotPassword } = require('./controller');
const { success_created } = require('../../utils/responser')

router.post('/register', function (req, res, next) {
    Promise.try(() => {
        const userAdded = _register(req.body)
        return userAdded
    })
        .then(response => res.status(response.statusCode).json(response))
        .catch(error => res.send(error))
})

router.get('/verify', function (req, res, next) {
    Promise.try(() => {
        const verified = _verify(req.query.token)
        return verified
    })
        .then(response => res.status(response.statusCode).json(response))
        .catch(error => res.send(error))
})

router.put('/logout', function (req, res, next) {
    Promise.try(() => {
        const loggedOut = _logout(req.query.userId, req.query.deviceId)
        return loggedOut
    })
        .then(response => res.status(response.statusCode).json(response))
        .catch(error => res.send(error))
})

router.post('/avatars', upload, function (req, res, next) {
    Promise.try(() => {
        const uploadedAvatar = req.file;
        return success_created('Success upload', uploadedAvatar)
    })
        .then(response => res.status(response.statusCode).json(response))
        .catch(error => res.send(error))
})

router.post('/login', function (req, res, next) {
    Promise.try(() => {
        const logged = _login(req.body)
        return logged
    })
        .then(response => res.status(response.statusCode).json(response))
        .catch(error => res.send(error))
})

router.put('/forgot_password', function (req, res, next) {
    Promise.try(() => {
        const forgotPassword = _forgotPassword(req.body)
        return forgotPassword
    })
        .then(response => res.status(response.statusCode).json(response))
        .catch(error => res.send(error))
})

module.exports = router;