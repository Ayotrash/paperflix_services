var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
    res.send('/users is existed. ' + JSON.stringify(req.tokenData))
})

module.exports = router