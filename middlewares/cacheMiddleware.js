const options = {
    prefix: 'web2',
    expire: 5 * 60
}

if (process.env.REDIS_URL) options.client = require('redis').createClient(process.env.REDIS_URL)
else options.host = "127.0.0.1" // for running locally instead of heroku

const cache = require('express-redis-cache')(options)

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