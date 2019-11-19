const mongoConnection = require('../config/mongodb-connection')
const multer        = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const mongoose = require('mongoose')

const storage = new GridFsStorage({
    url: mongoose.connection,
    filename: function (req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'avatars'
})

const upload = multer({ //multer settings for single upload
    storage: storage
}).single('avatar');

module.exports = upload