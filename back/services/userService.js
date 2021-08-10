const userModel = require("../models/userSchema");

const Service = {};

Service.getAllAsync = async () => {
    return await userModel.find({});
};

Service.getByIdAsync = async () => {};

Service.createAsync = async (newUserData) => {
    const newUser = new userModel(newUserData);
    return await newUser.save();
};

module.exports = Service;