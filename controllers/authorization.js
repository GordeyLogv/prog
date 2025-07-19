const {
    createNewPerson,
    searchDuplicateEmail,
    searchPerson
    // saveRefreshToken
} = require('../DB/queries/authorization');
const {
    hashPassword,
    comparePassword,
    createAccessToken
    // createRefreshToken
} = require('../models/authorization');

const getAuthHandler = (req, res) => {
    res.json('Auth page');
};

const postAuthRegisterHandler = async (req, res) => {
    
    const {email, password, username, age} = req.body;

    if (!email || !password || !username || !age) return res.status(400).json('Проверьте введённые данные');

    const duplicate = await searchDuplicateEmail(email);

    if (duplicate) return res.status(400).json(`Пользователь с таким email: ${email} уже зарегистрирован`);

    const hash = await hashPassword(password);
    
    await createNewPerson(email, hash, role = 'reader', username, age);

    res.json('Пользователь создан');
};

const postAuthLoginHandler = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.status(400).json('Проверьте введённые данные');

    const foundPerson = await searchPerson(email)

    if (!foundPerson) return res.status(400).json(`Пользователь с email: ${email} не зарегистрирован`)

    const compare = await comparePassword(password, foundPerson.password);

    if (!compare) return res.status(400).json('Не правильный пароль, попробуйте ещё раз');

    const accessToken = createAccessToken(foundPerson);
    // const refreshToken = createRefreshToken(foundPerson);

    // await saveRefreshToken(foundPerson.email, refreshToken);

    res.json({ accessToken });
};

module.exports = {
    getAuthHandler,
    postAuthRegisterHandler,
    postAuthLoginHandler
};