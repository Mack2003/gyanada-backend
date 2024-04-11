const userModule = require("../Model/UserModel");
const { getLoggedInUserRecord } = require("../Services/UserAuth");

const UserCoockieAuth = async (req, res, next) => {
    if (req.cookies?.uid) {
        const UserId = getLoggedInUserRecord(req.cookies.uid);

        if (UserId) {
            const userdata = await userModule.findById(UserId);
            return res.header(200).json({ massage: true, data: userdata });
        } else {
            return next()
        }
    } else {
        next();
    }
};

module.exports = { UserCoockieAuth };