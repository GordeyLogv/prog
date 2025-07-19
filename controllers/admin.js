const {
    getAllPerson,
    getAllAuthPerson,
    getTopArticle,
    deletePersonById,
    changeRolePerson,
    deleteRefreshToken
} = require('../DB/queries/admin');

const getAdminPanelHandler = (req, res) => {
    res.json('Admin-panel');
};

const getAllPersonHandler = async (req, res) => {
    
    const allPerson = await getAllPerson();

    res.json(allPerson);
};

const getAllAuthorizedPerson = async (req, res) => {
    
    const allAuthPerson = await getAllAuthPerson();
    
    res.json(allAuthPerson);
};

const getTopFiveArticle = async (req, res) => {
    
    const topFiveArticles = await getTopArticle();
    
    res.json(topFiveArticles);
};

const deleteDeletePerson = async (req, res) => {
    
    const id = req.body

    await deletePersonById(id);
    
    res.json('Person delete');
};

const putChangeRolePerson = async (req, res) => {
    
    const { id, role } = req.body;

    await changeRolePerson(id, role);

    res.json('Person change role');
};

const putLogoutPerson = async (req, res) => {
    
    const { id } = req.body;

    await deleteRefreshToken(id)

    res.json('Person logout');
};

module.exports = {
    getAdminPanelHandler,
    getAllPersonHandler,
    getAllAuthorizedPerson,
    getTopFiveArticle,
    deleteDeletePerson,
    putChangeRolePerson,
    putLogoutPerson
}