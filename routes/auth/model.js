const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Auth = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    auth: {
        email: { type: String, index: true, unique: true, required: true },
        password: { type: String, required: true }
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    avatar: { type: String },
    device_info: { type: Array, default: [] },
    is_active: { type: Boolean, default: true },
    is_verfied: { type: Boolean, default: false },
    is_premium: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

Auth.plugin(uniqueValidator)

module.exports = mongoose.model('users', Auth);