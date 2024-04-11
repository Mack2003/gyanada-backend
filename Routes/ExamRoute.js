const express = require('express');
const ExamRoute = express.Router();
const ExamModel = require('../Model/ExamModel');
const {
    ExamRouterGetRequest,
    ExamRouterGetRequest_single,
    ExamRouterPostRequest,
    ExamRouterPutRequest,
    ExamRouterDeletRequest
} = require('../Controller/ExamController');


ExamRoute.get('/', ExamRouterGetRequest);
ExamRoute.get('/singel/:_id', ExamRouterGetRequest_single);
ExamRoute.post('/', ExamRouterPostRequest);
ExamRoute.put('/', ExamRouterPutRequest);
ExamRoute.delete('/', ExamRouterDeletRequest);


module.exports = ExamRoute;