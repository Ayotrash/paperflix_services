const express = require('express');
const Promise = require('bluebird');

var router = express.Router();

const { _addUserToDB } = require('./controller');

router.post('/register', function(req, res, next) {
    Promise.try(() => {
        const userAdded = _addUserToDB(req.body)
        return userAdded
    })
    .then(response => res.send(response))
    .catch(error => res.send(error))
})

module.exports = router;