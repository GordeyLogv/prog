const getAuthHandler = (req, res) => {
    res.json('Auth')
};

const postAuthRegisterHandler = (req, res) => {
    res.json('Reg');
}

const postAuthLoginHandler = (req, res) => {
    res.json('login');
}

module.exports = {
    getAuthHandler,
    postAuthRegisterHandler,
    postAuthLoginHandler
};