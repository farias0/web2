const postModel = require("../models/postSchema");

const Service = {};

Service.getAllAsync = async () => {
    return await postModel.find({});
};

Service.getByIdAsync = async () => {};

Service.createAsync = async (newPostData) => {
    const newPost = new postModel(newPostData);
    return await newPost.save();
};

module.exports = Service;