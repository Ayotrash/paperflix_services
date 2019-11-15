const express = require('express');
const Promise = require('bluebird');

var router = express.Router();

const { _register, _verify, _logout, _uploadImageTest } = require('./controller');

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

router.post('/upload', function(req, res, next) {
    Promise.try(() => {
        const uploadedImage = _uploadImageTest(req.body.image)
        console.log(req.body.image)
        return uploadedImage
    })
    .then(response => res.status(response.statusCode).json(response))
    .catch(error => res.send(error))
})

module.exports = router;