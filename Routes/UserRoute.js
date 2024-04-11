const express = require('express');
const UserModel = require('../Model/UserModel');
const { UserRouteGetRequest, UserRoutePostRequest, UserRouteGetRequest_allStudents, UserRouteGetRequest_singleUser_nopassword, UserRouteDeleteRequest } = require('../Controller/UserConroller');
const { UserCoockieAuth } = require('../Middlewares/UserAuth');
const UserRoute = express.Router();

UserRoute.get('/', UserRouteGetRequest);
UserRoute.post('/', UserRoutePostRequest);
UserRoute.get('/search', UserRouteGetRequest_allStudents);
UserRoute.get('/admin/:Student_id', UserRouteGetRequest_singleUser_nopassword);
UserRoute.delete('/:idToDelet', UserRouteDeleteRequest);
UserRoute.put('/', async (req, res) => {
    const { examResult, studentId } = req.body;

    try {
        const responce = await UserModel.findById(studentId);
        if (responce) {
            const indexToRemove = responce.pendingExam.find((item, index) => {
                if (item._id === examResult.examId) {
                    return index;
                };
            });

            responce.pendingExam.splice(indexToRemove, 1);
            responce.examDone.push(examResult);
            let avaregScore = 0;
            responce.examDone.map(item => {
                avaregScore += item.score;
            });
            responce.avarageScore = Math.floor((avaregScore / (responce.examDone.length * 100)) * 100);
            responce.save();
            res.header(200).json({ status: true, massage: "Exam saved sucessfuly", data: null });
        } else {
            res.header(404).json({ status: false, massage: "No such user found", data: null });
        };
    } catch (error) {
        res.header(500).json({ status: false, massage: `Server Error: ${error}`, data: null });
    };
});

module.exports = UserRoute;