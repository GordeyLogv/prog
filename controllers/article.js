const {
    getAllArticle,
    getArticle,
    saveNewArticle,
    changeArticle,
    deleteArticle
} = require('../DB/queries/article');

const getAllArticleHandler = async (req, res) => {
    
    const getData = await getAllArticle();

    res.json(getData);
}

const getArticleHandler = async (req, res) => {

    const id = req.params.id;

    if (!id) return res.status(400);

    const getData = await getArticle(id);

    res.json(getData);
};

const postArticleHandler = async (req, res) => {
    
    const {title, img, text} = req.body;

    if (!title || !img || !text) return res.status(400).json('Проверьте введённые данные');

    await saveNewArticle(title, views = 0, img, text);

    res.json('Статья создана!');
};

const putArticleHandler = async (req, res) => {
    
    const id = req.params.id;
    
    if (!id) return res.status(400);

    const {title, img, text} = req.body;

    if (!title || !img || !text) return res.status(400).json('Проверьте введённые данные');

    await changeArticle(id, title, views = 0, img, text);

    res.json('Статья обновлена!')
};

const deleteArticleHandler = async (req, res) => {
    
    const id = req.params.id;
    
    if (!id) return res.status(400);

    await deleteArticle(id);

    res.json('Статья удалена!')
};

module.exports = {
    getAllArticleHandler,
    getArticleHandler,
    postArticleHandler,
    putArticleHandler,
    deleteArticleHandler
};