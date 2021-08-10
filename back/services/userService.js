const userModel = require('../models/userSchema')
const errors = require('../errors/userErrors')

const Service = {};

Service.getAllAsync = async () => {
    return await userModel.find({});
};

Service.getByIdAsync = async () => {};

Service.getByUsernameAsync = async (username) => {
    return await userModel.findOne({ username })
}

Service.getByEmailAsync = async (email) => {
    return await userModel.findOne({ email })
}

Service.createAsync = async (newUserData) => {
    if (!newUserData.username) throw errors.invalidUsername
    if (!newUserData.password) throw errors.invalidPassword
    if (!newUserData.email) throw errors.invalidEmail

    if (await Service.getByUsernameAsync(newUserData.username)) throw errors.usernameAlreadyExists
    if (await Service.getByEmailAsync(newUserData.email)) throw errors.emailAlreadyExists

    const newUser = new userModel(newUserData);
    return await newUser.save();
};

module.exports = Service;