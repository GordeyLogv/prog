const db = require('../db');

module.exports.createNewPerson = async (email, password, role, username, age) => {
    const getInfoPersonId = await db.query(
        `INSERT INTO person_info (username, age) VALUES ($1, $2) RETURNING id`,
        [username, age]
    );

    const getIdRole = await db.query(
        `SELECT id FROM person_role WHERE rol = $1`,
        [role]
    );

    await db.query(
        `INSERT INTO person (email, pswd, role_id, info_id) VALUES ($1, $2, $3, $4)`,
        [email, password, getIdRole.rows[0].id, getInfoPersonId.rows[0].id]
    );
};

module.exports.searchDuplicateEmail = async (email) => {
    const duplicate = await db.query(
        `SELECT email FROM person WHERE email = $1`,
        [email]
    )

    return duplicate.rows.length > 0
}

module.exports.searchPerson = async (email) => {
    const data = await db.query(
        `SELECT p.id AS id,
                p.email AS email,
                p.pswd AS password,
                r.rol AS role,
                i.username AS username,
                i.age AS age
        FROM person AS p
        JOIN person_role AS r ON p.role_id = r.id
        JOIN person_info AS i ON p.info_id = i.id
        WHERE p.email = $1`,
        [email]
    );

    return data.rows[0]
};

module.exports.saveRefreshToken = async (email, token) => {
    const personId = await db.query(
        `SELECT id FROM person WHERE email = $1`,
        [email]
    );

    const validateToken = await db.query(
        `SELECT token FROM person_token WHERE id = $1`,
        [personId.rows[0].id]
    );

    if (validateToken.rows.length === 0) {
        await db.query(
            `INSERT INTO person_token (id, token) VALUES ($1, $2)`,
            [personId.rows[0].id, token]
        );
    } else {
        await db.query(
            `UPDATE person_token set token = $1 WHERE id = $2`,
            [token, personId.rows[0].id]
        )
    }
}