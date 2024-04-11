const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
    examName: {
        type: String,
        require: true,
        unique: true,
    },
    passmark: {
        type: Number,
        require: true,
    },
    students: {
        type: Array,
        require: true,
    },
    marksPerQuestion: {
        type: Number,
        require: true,
    },
    QuestionAnswer: {
        type: Array,
        require: true,
    },
    TotalTime: {
        type: Number,
        require: true,
    }

}, { timestamps: true });

const ExamModel = mongoose.model('Exams', ExamSchema);

module.exports = ExamModel;