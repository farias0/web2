const postModel = require('../schemas/postSchema')
const errors = require('../errors/postErrors')

const Service = {};

Service.getAllAsync = async () => {
    const searchData = await postModel.find({})
    return searchData.reverse()
};

Service.searchAsync = async (query) => {
    const searchData = await postModel.find({
        "content": { "$regex": query, "$options": "i" }
    })
    return searchData.reverse()
}

Service.createAsync = async (newPostData) => {
    if (!['text', 'image', 'video'].includes(newPostData.contentType)) throw errors.invalidType

    const newPost = new postModel(newPostData)

    return await newPost.save()
}

module.exports = Service