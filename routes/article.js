const express = require('express');
const {
    getAllArticleHandler,
    getArticleHandler,
    postArticleHandler,
    putArticleHandler,
    deleteArticleHandler
} = require('../controllers/article');

const router = express.Router();

router.get('/', getAllArticleHandler);
router.get('/view/:id', getArticleHandler);
router.post('/add', postArticleHandler);
router.put('/put/:id', putArticleHandler);
router.delete('/delete/:id', deleteArticleHandler);

module.exports = router;