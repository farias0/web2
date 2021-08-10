const userModel = require("../models/userSchema");

const Service = {};

Service.getAllAsync = async () => {
    return await userModel.find({});
};

Service.getByIdAsync = async () => {};

Service.getByUsernameAsync = async (username) => {
    return await userModel.findOne({ username })
}

Service.createAsync = async (newUserData) => {
    const newUser = new userModel(newUserData);
    return await newUser.save();
};

module.exports = Service;