const express = require('express');
const Promise = require('bluebird');

var router = express.Router();

const { _register, _verify } = require('./controller');

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

module.exports = router;