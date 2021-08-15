let redis_url = process.env.REDIS_URL
if (!redis_url) redis_url = "127.0.0.1" // for running locally instead of heroku

const cache = require('express-redis-cache')({
    prefix: 'web2',
    host: redis_url,
    expire: 5 * 60
})

cache.on('message', message => console.log('[cacheMiddleware] ' + message))

module.exports = cache.route()