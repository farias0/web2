const userModel = require("../models/userSchema");

const Service = {};

Service.getAll = async () => {
    return await userModel.find({});
};

Service.getById = async () => {};

Service.create = async (newUserData) => {
    const newUser = new userModel(newUserData);
    return await newUser.save();
};

module.exports = Service;