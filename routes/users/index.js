var express = require('express');
var router = express.Router();

var authenticationMiddleware = require('../../utils/authenticationMiddleware')

router.post('/users', authenticationMiddleware, function(req, res, next) {
    res.send('/users is existed.')
})

module.exports = router