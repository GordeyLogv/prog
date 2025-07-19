const express = require('express');
const {
    getAllArticleHandler,
    getArticleHandler,
    postArticleHandler,
    putArticleHandler,
    deleteArticleHandler
} = require('../controllers/article');
const { verifyJWT } = require('../security/middleware/verify-jwt')
const { verifyRole } = require('../middleware/verify-role');

const router = express.Router();

router.get('/', getAllArticleHandler);
router.get('/view/:id', getArticleHandler);
router.post('/add', verifyJWT, verifyRole, postArticleHandler);
router.put('/put/:id', verifyJWT, verifyRole, putArticleHandler);
router.delete('/delete/:id', verifyJWT, verifyRole, deleteArticleHandler);

module.exports = router;