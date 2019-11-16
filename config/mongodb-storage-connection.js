const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

Grid.mongo = mongoose.mongo;
let gfs = new Grid(mongoose.connections.db);

const storage = require('multer-gridfs-storage')({
    db: mongoose.connection.db,
    file: (req, file) => {
        return {
            filename: file.originalname
        }
    }
})

const singleUpload = multer({ storage: storage }).single('file')

module.exports = {
    singleUpload
}