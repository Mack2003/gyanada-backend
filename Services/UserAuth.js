const LoggedInUserRecord = new Map();

const setLoggedInUserRecord = (uid, userData) => {
    LoggedInUserRecord.set(uid, userData._id);
};

const getLoggedInUserRecord = (uid) => {
    return LoggedInUserRecord.get(uid);
};

module.exports = { setLoggedInUserRecord, getLoggedInUserRecord }