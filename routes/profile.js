const express = require('express');
const {
    getProfileHandler,
    postLogoutHandler,
    putChangeUsername,
    putChangePassword
} = require('../controllers/profile');

const router = express.Router();

router.get('/', getProfileHandler);
router.post('/logout', postLogoutHandler);
router.put('/change-username', putChangeUsername);
router.put('/change-password', putChangePassword);

module.exports = router;
