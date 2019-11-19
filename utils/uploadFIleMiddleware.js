const multer        = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

const url = process.env.MONGODB_SERVER_DEV;

const storage = new GridFsStorage({
    url,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {
        return {
            filename: 'paperflix_' + Date.now()
        }
    },
    root: 'avatars'
})

const upload = multer({ //multer settings for single upload
    storage: storage
}).single('avatar');

module.exports = upload