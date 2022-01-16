const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const header = req.get('Authorization')
    if (header) {
        const token = header.split(" ")[1]
        if (token) {
            jwt.verify(token, 'tokenSuperSecret', (err, user) => {
                if (err) res.status(403).json(err.message)
                else next()
            })
        } else res.status(403).json('not authorized')
    } else {
        res.status(401).json('user not signed')
    }
}

module.exports = { verifyToken }