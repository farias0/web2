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

    if (['image', 'video'].includes(newPostData.contentType)) newPostData = mediaToBase64(newPostData)

    const newPost = new postModel(newPostData)

    return await newPost.save()
}

function mediaToBase64(post) {
    post.content = post.content.toString('base64')
    return post
}

module.exports = Service