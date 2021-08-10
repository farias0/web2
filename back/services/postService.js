const postModel = require("../models/postSchema");

const Service = {};

Service.getAll = async () => {
    return await postModel.find({});
};

Service.getById = async () => {};

Service.create = async (newPostData) => {
    const newPost = new postModel(newPostData);
    return await newPost.save();
};

module.exports = Service;