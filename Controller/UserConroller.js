const UserModule = require('../Model/UserModel');
const { v4: uuidV4 } = require('uuid');
const { setLoggedInUserRecord } = require('../Services/UserAuth');

const UserRoutePostRequest = async (req, res) => {

    let {
        name,
        email,
        userType,
        phoneNumber,
        minQulification,
        courseName,
        CoursePrice,
        gender
    } = req.body;

    let password = "Gyanada" + name;
    password = password.replace(' ', '_');

    try {
        let response = await UserModule.create({
            name,
            email,
            userType,
            phoneNumber,
            minQulification,
            courseName,
            CoursePrice,
            gender,
            password: password,
        })

        if (response) {
            return res.header(200).json({ massage: "User Sucessfully Registred", data: null });
        };

    } catch (error) {
        return res.header(404).json({ massage: 'User already exist With same email', data: null });
    };
};

const UserRouteGetRequest = async (req, res) => {

    let { email, password } = req.query;
    //In case password and email is not given
    if (!email) {
        return res.header(404).json({ status: false, massage: "Fill user name and password", data: null });
    }
    
    let userProfileData = await UserModule.find({ email }).catch((error) => {
        return res.header(404).json({ status: false, massage: `${error}`, data: '' });
    });
    
    if (userProfileData.length < 1) {
        return res.header(404).json({ status: false, massage: "No such user is available", data: null });
    } else {
        if (userProfileData[0].password === password) {
            return res.header(200).json({ status: true, massage: true, data: userProfileData[0] });
        } else {
            return res.header(404).json({ status: false, massage: "Incorrect username or password", data: null });
        };
    };
};

const UserRouteGetRequest_allStudents = async (req, res) => {

    try {
        let Students = await UserModule.find({});

        Students = Students?.map(item => {
            if (item.userType !== 'admin') {
                return {
                    name: item.name,
                    _id: item._id,
                    email: item.email,
                };
            };
        });

        if (Students.length >= 1) {
            return res.header(200).json({ status: true, massage: true, data: Students });
        } else {
            return res.header(404).json({ status: false, massage: "No Student Found According to the search", data: null });
        };

    } catch (error) {
        return res.header(500).json({ status: false, massage: `Server Error : ${error}`, data: null });
    };

};

const UserRouteGetRequest_singleUser_nopassword = async (req, res) => {
    try {
        let responce = await UserModule.findById(req.params.Student_id);
        res.header(200).json({ status: true, massage: true, data: responce });
    } catch (error) {
        res.header(200).json({ status: false, massage: `Error: ${error}`, data: null });
    };
};

const UserRouteDeleteRequest = async (req, res) => {

    try {
        const responce = await UserModule.findByIdAndDelete(req.params.idToDelet);
        if (responce) {
            return res.header(200).json({ status: true, massage: "Successfully deleted !!!", data: null });
        } else {
            return res.header(404).json({ status: false, massage: "No such user foun dto be deleted ???", data: null });
        }
    } catch (error) {
        res.header(500).json({ status: false, massage: `Server Error ${error}`, data: null });
    };
};

module.exports = {
    UserRouteGetRequest,
    UserRoutePostRequest,
    UserRouteGetRequest_allStudents,
    UserRouteGetRequest_singleUser_nopassword,
    UserRouteDeleteRequest,
};
