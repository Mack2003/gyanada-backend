const ExamModel = require('../Model/ExamModel');
const userModule = require('../Model/UserModel');

const ExamRouterGetRequest = async (req, res) => {

    const ExamData = await ExamModel.find({}).catch(err => {
        return res.header(500).json({ status: false, massage: `Server Error : ${err}`, data: null })
    });

    if (ExamData.length < 1) {
        return res.header(200).json({ status: false, massage: "No data available to show", data: null })
    };

    let FiltredExamData = ExamData.map(item => {
        return {
            examName: item.examName,
            _id: item._id,
        };
    });

    res.header(200).json({ status: true, massage: true, data: FiltredExamData });
};

const ExamRouterGetRequest_single = async (req, res) => {

    const ExamID = req.params._id;

    if (ExamID) {
        let ExamData = await ExamModel.findById(ExamID).catch(err => {
            return res.header(500).json({ status: false, massage: `Server Error : ${err}`, data: null })
        });

        if (ExamData) {
            return res.header(200).json({ status: true, massage: true, data: ExamData });
        }else{
            return res.header(200).json({ status: false, massage: "No Exam data to show", data: null });
        };
    };
};

const ExamRouterPostRequest = async (req, res) => {

    let { 
        examName, 
        passmark, 
        students, 
        marksPerQuestion, 
        QuestionAnswer, 
        TotalTime
    } = req.body;

    let exam = await ExamModel.create({
        examName, 
        passmark, 
        students, 
        marksPerQuestion, 
        QuestionAnswer, 
        TotalTime
    }).catch(err => {
        return res.header(500).json({ status: false, massage: `Server Error : ${err}`, data: null })
    });

    students?.map( async student => {
        let studentData = await userModule.findById(student._id);
        studentData.pendingExam.push({ examName: exam.examName, _id: exam._id });
        studentData.save();
    });

    return res.header(200).json({ status:true, massage: "SuccessFuly Created Exam", data: null })
};

const ExamRouterPutRequest = async (req, res) => {

    let updateRequestedExam = req.body;

    const Exam = await ExamModel.findById(updateRequestedExam._id).catch(err => {
        return res.header(500).json({ massage: `Error in server : ${err}`, data: null });
    });

    if (!Exam) {
        return res.header(404).json({ massage: `No Existing Exam found maching with given id`, data: null });
    };

    //****Update Student logic will go here****
    if (Exam.passmark !== updateRequestedExam.passmark) {
        Exam.passmark = updateRequestedExam.passmark;
    };
    Exam.QuestionAnswer = updateRequestedExam.QuestionAnswer;
    Exam.save();

    return res.header(200).json({ massage: "Update Successfull", data: null });
}

const ExamRouterDeletRequest = async (req, res) => {

    const ExamDeletRequest = await ExamModel.findByIdAndDelete(req.query._id).catch(err => {
        return res.header(500).json({ status: false, massage: `Server Error : ${err}`, data: null });
    });

    if (!ExamDeletRequest) {
        return res.header(200).json({ status: false, massage: "No such Exam is available", data: null });
    } else {
        ExamDeletRequest.student?.map( async item => {
            const student = await userModule.findById(item._id).catch(err => console.log(err));
            if (student) {
                let newPendingExamList = student.pendingExam?.filter(ExamItem => {
                    if (ExamItem._id !== ExamDeletRequest._id) {
                        return ExamItem;
                    }
                });

                student.pendingExam = newPendingExamList;
                student.save();
            }
        });
        return res.header(200).json({ status: true, massage: "Deleted Successfull", data: null });
    };
};

module.exports = {
    ExamRouterGetRequest,
    ExamRouterGetRequest_single,
    ExamRouterPostRequest,
    ExamRouterPutRequest,
    ExamRouterDeletRequest,
}