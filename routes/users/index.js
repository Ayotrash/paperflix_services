var express = require('express');
var router = express.Router();

router.post('/users', function(req, res, next) {
    res.send('/users is existed.')
})

module.exports = router