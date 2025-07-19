const express = require('express');
const {
    getAdminPanelHandler,
    getAllPersonHandler,
    getAllAuthorizedPerson,
    getTopFiveArticle,
    deleteDeletePerson,
    putLogoutPerson,
    putChangeRolePerson
} = require('../controllers/admin');

const router = express.Router();

router.get('/', getAdminPanelHandler);
router.get('/all-person', getAllPersonHandler);
router.get('/all-auth-person', getAllAuthorizedPerson);
router.get('/top-article', getTopFiveArticle);
router.delete('/delete-person', deleteDeletePerson);
router.put('/logout-person', putLogoutPerson);
router.put('/change-role', putChangeRolePerson);

module.exports = router;