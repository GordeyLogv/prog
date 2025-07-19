const db = require('../db');

module.exports.getAllPerson = async () => {
    const data = await db.query(
        `SELECT p.id AS id,
                p.email AS email,
                r.rol AS role,
                i.username AS name,
                i.age AS age
        FROM person AS p
        JOIN person_role AS r ON p.role_id = r.id
        JOIN person_info AS i ON p.info_id = i.id`
    );

    return data.rows;
};

module.exports.getAllAuthPerson = async () => {
    const data = await db.query(
        `SELECT p.id AS id,
                p.email AS email,
                r.rol AS role,
                i.username AS name,
                i.age AS age
        FROM person AS p
        JOIN person_role AS r ON p.role_id = r.id
        JOIN person_info AS i ON p.info_id = i.id
        WHERE p.token_id > 0`
    );

    return data.rows;
};

module.exports.getTopArticle = async () => {
    const data = await db.query(
        `SELECT id, title, views
        FROM article
        ORDER BY views DESC
        LIMIT 5`
    );

    return data.rows;
};

module.exports.deletePersonById = async (id) => {
    
    const getPerson = await db.query(
        `SELECT * FROM person WHERE id = $1`,
        [id]
    )

    const deletePerson = await db.query(
        `DELETE FROM person WHERE id = $1`,
        [id]
    );
    
    const deletePersonInfo = await db.query(
        `DELETE FROM person_info WHERE id = $1`,
        [id]
    );

    if (getPerson.rows[0]['token_id']) {

        const personTokenId = getPerson.rows[0]['token_id'];

        const deletePersonToken = await db.query(
            `DELETE FROM person_token WHERE id = $1`,
            [personTokenId]
        );
    };
};

module.exports.changeRolePerson = async (id, role) => {
    const roleId = await db.query(
        `SELECT id FROM person_role WHERE rol = $1`,
        [role]
    );

    await db.query(
        `UPDATE person set role_id = $1 WHERE id = $2`,
        [roleId.rows[0].id, id]
    );
};

module.exports.deleteRefreshToken = async (id) => {
    const deletePersonTokenId = await db.query(
        `UPDATE person set token_id = $1 WHERE id = $2`,
        [null, id]
    );

    const deletePersonToken = await db.query(
        `DELETE FROM person_token WHERE id = $1`,
        [id]
    );
};



