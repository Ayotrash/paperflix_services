var express = require('express');
var router = express.Router();

router.post('/users', function(req, res, next) {
    res.send('/users is existed. ' + JSON.stringify(req.user_data))
})

module.exports = router