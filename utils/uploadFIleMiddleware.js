const multer        = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const url = process.env.MONGODB_SERVER_DEV;

const storage = new GridFsStorage({
    url,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
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