const jwt = require('jsonwebtoken')
const router = require('express').Router()

router.post('/signuser', (req, res, next) => {
    const payload = {user: req.body.user}
    if (req.body.user) {
        jwt.sign(payload, 'tokenSuperSecret', {
            expiresIn: '10m'
        }, (err, token) => {
            if (err) res.status(422).json('auth error')
            else {
                res.json(token)
            }
        })
    } else {
        res.status(400).json('provide a user')
    }
})

module.exports = router