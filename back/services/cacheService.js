const redis_url = process.env.REDIS_URL;
const redis =  require('async-redis').createClient(redis_url)

const logAppend = '[cacheService] '

function makeKey(pool, key) {
    const separator = ':sep:'
    return pool + separator + key
}

function undoKey(fullKey) {
    return fullKey.split(separator)
}

class Service {

    constructor(pool, expirationTime = 5 * 60) {
        this.pool = pool
        this.expirationTime = expirationTime
    }

    async setAsync(key, value) {
        console.log(logAppend + 'setting cache for key=' + key)
        await redis.set(makeKey(this.pool, key), JSON.stringify(value), 'EX', this.expirationTime)
    }

    async getAsync(key) {
        var cachedData = await redis.get(makeKey(this.pool, key))
        if (cachedData) {
            console.log(logAppend + 'found cached data for key=' + key)
            return JSON.parse(cachedData) 
        }
        console.log(logAppend + 'cached data for key=' + key + ' not found')
    }
}

module.exports = Service