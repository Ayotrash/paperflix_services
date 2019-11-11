const mongoose = require('mongoose');

const Users = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    auth: {
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    gender: { type: String, enum: ['male', 'female'], required: true },
    avatar: { type: String },
    phone_number: { type: String },
    job_title: { type: String },
    bod: { type: Date },
    driving_license: { type: String },
    about: { type: String },
    employments: [{
        job_title: String,
        company: String,
        start_date: Date,
        end_date: Date,
        is_current: { type: Boolean, default: false, required: true },
        city: String,
        description: String
    }],
    educations: [{
        school: String,
        degree: String,
        start_date: Date,
        end_date: Date,
        is_current: { type: Boolean, default: false, required: true },
        city: String,
        description: String
    }],
    skills: [{
        name: String,
        level: Number
    }],
    extracurriculars: [{
        function_title: String,
        organization_name: String,
        start_date: Date,
        end_date: Date,
        is_current: { type: Boolean, default: false, required: true },
        city: String,
        description: String
    }],
    languages: [{
        name: String,
        level: Number
    }],
    hobbies: String,
    references: [{
        name: String,
        position: String,
        company: String,
        testimonials: String,
        phone_number: String
    }],
    courses: [{
        name: String,
        institution: String,
        start_date: Date,
        end_date: Date,
    }],
    address: {
        country: { type: String },
        state: { type: String },
        city: { type: String },
        zipcode: { type: String },
        address: { type: String }
    },
    is_active: { type: Boolean, default: true },
    is_verfied: { type: Boolean, default: false },
    is_premium: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', Users);