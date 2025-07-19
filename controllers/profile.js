const { deleteRefreshToken } = require('../DB/queries/admin');
const { changeName, changePassword } = require('../DB/queries/profile');
const { hashPassword } = require('../models/authorization');

const getProfileHandler = (req, res) => {
    
    const person = req.person;
    
    res.json(`Привет, ${person.username}`);
}

const postLogoutHandler = async (req, res) => {

    const person = req.person;

    await deleteRefreshToken(person.id)
    
    res.json('Вы вышли из аккаунта');
};

const putChangeUsername = async (req, res) => {

    const person = req.person;
    const { newUsername } = req.body

    await changeName(person.id, newUsername);
    
    res.json('Смена имени прошла успешно');
};

const putChangePassword = async (req, res) => {

    const person = req.person;
    const { newPassword } = req.body;

    const password = await hashPassword(newPassword);

    await changePassword(person.id, password)

    res.json('Смена пароля прошла успешно');
};

module.exports = {
    getProfileHandler,
    postLogoutHandler,
    putChangeUsername,
    putChangePassword
};