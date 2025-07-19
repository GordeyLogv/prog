const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyJWT = (req, res, next) => {

    if (!req.headers['authorization']) return res.status(401).json('Пройдите авторизацию');
    
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return res.status(403).json('Срок действия токена истек, пройдите авторизацию');
        req.person = data;
        next()
    });
};