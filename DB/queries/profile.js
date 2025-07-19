const db = require('../db');

module.exports.changeName = async (id, username) => {
    await db.query(
        `UPDATE person_info set username = $1 WHERE id = $2`,
        [username, id]
    );
};

module.exports.changePassword = async (id, password) => {
    await db.query(
        `UPDATE person set pswd = $1 WHERE id = $2`,
        [password, id]
    );
};
