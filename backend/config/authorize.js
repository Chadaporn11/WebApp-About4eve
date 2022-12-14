const jwt = require('jsonwebtoken');

const key = 'My_Key';

const authorization = ((req, res, next) => {
    const token = req.headers['authorization'];

    if(token === undefined) {
        return res.status(401).json({
            "status": 401,
            "message": 'Unauthorized'
        })
    } else {
        jwt.verify(token, key, (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    "status": 401,
                    "message": 'Unauthorized'
                })
            } else {
                console.log(decoded)
                next()
            }
        })
    }
})

module.exports = authorization
