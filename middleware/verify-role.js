const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.verifyRole = (req, res, next) => {
    const person = req.person;

    if (person.role !== 'admin' || 'moderator') return res.status(403).json('Нет доступа');

    next();
};

module.exports.verifyRoleAdmin = (req, res, next) => {
    const person = req.person;

    if (person.role !== 'admin') return res.status(403).json('Нет доступа');

    next();
};