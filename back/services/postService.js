const authService = require('./authService')
const postModel = require('../models/postSchema')
const errors = require('../errors/postErrors')

const Service = {};

Service.getAllAsync = async () => {
    return await postModel.find({})
};

Service.getByIdAsync = async () => {}

Service.searchAsync = async (query) => {
    return postModel.find(
        {
            "content": { "$regex": query, "$options": "i" }
        },
        (err, docs) => {}
    )
}

Service.createAsync = async (newPostData) => {
    try {
        newPostData.userId = authService.getUserId(newPostData.token)
    } catch (error) {
        throw errors.invalidToken
    }

    const newPost = new postModel(newPostData)
    return await newPost.save()
}

module.exports = Service