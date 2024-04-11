const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    userType: {
        type: String,
        require: true,
    },
    pendingExam: {
        type: Array,
        default: [],
    },
    examDone: {
        type: Array,
        default: [],
    },
    profileImage: {
        type: String,
        default: '',
    },
    avarageScore: {
        type: Number,
        default: 0,
    },
    phoneNumber: {
        type: Number,
        require: true,
        unique: true,
    },
    minQulification: {
        type: String,
        require: true,
    },
    courseName: {
        type: String,
        require: true,
    },
    CoursePrice: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    }
}, { timestamps: true });

const userModule = mongoose.model('user', userSchema);

module.exports = userModule;