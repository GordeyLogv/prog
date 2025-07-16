const express = require('express');
const {
    getAuthHandler,
    postAuthRegisterHandler,
    postAuthLoginHandler
} = require('../controllers/authorization');

const router = express.Router();

router.get('/', getAuthHandler);
router.post('/register', postAuthRegisterHandler);
router.post('/login', postAuthLoginHandler);

module.exports = router;