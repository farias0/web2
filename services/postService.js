const authService = require('./authService')
const postModel = require('../schemas/postSchema')
const errors = require('../errors/postErrors')
const cacheService = new (require('./cacheService'))('posts')

const allCacheKey = '[all]'

const Service = {};

Service.getAllAsync = async () => {
    // const cachedData = await cacheService.getAsync(allCacheKey)
    // if (cachedData) return cachedData

    const searchData = await postModel.find({})
    // cacheService.setAsync(allCacheKey, searchData)
    return searchData.reverse()
};

Service.getByIdAsync = async () => {}

Service.searchAsync = async (query) => {
    const cachedData = await cacheService.getAsync(query)
    if (cachedData) return cachedData

    const searchData = await postModel.find(
        {
            "content": { "$regex": query, "$options": "i" }
        },
        (err, docs) => {}
    )
    cacheService.setAsync(query, searchData)
    return searchData.reverse()
}

Service.createAsync = async (newPostData) => {
    if (!['text', 'image', 'video'].includes(newPostData.contentType)) throw errors.invalidType

    newPostData.userId = authService.authenticate(newPostData.token)

    const newPost = new postModel(newPostData)
    
    return await newPost.save()
}

module.exports = Service