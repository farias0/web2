let redis_url = process.env.REDIS_URL
if (!redis_url) redis_url = "127.0.0.1" // for running locally instead of heroku

const cache = require('express-redis-cache')({
    prefix: 'web2',
    host: redis_url,
    expire: 5 * 60
})

cache.on('message', message => console.log('[cacheMiddleware] ' + message))

const Middleware = {}

Middleware.cache = (req, res, next) => {
    cache.route(req.originalUrl)(req, res, next)
}

Middleware.clear = (req, _, next) => {
    const baseRoute = req.originalUrl.split("?")[0]
    cache.del(baseRoute + "*", next)
}

module.exports = Middleware