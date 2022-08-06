function Authorization(req, res, next) {
    if (process.env.IMAGE_API_KEY === req.headers.image_api_key) {
        next()
    } else {
        return res.status(401).json({ error: 'Access Denied' })
    }
}

module.exports = { Authorization }