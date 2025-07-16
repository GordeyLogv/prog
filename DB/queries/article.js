const db = require('../db');

module.exports.getAllArticle = async () => {
    const data = await db.query(
        `SELECT a.id AS id,
                a.title AS title,
                a.views AS views,
                c.img AS img,
                c.paragraph AS text
        FROM article AS a
        JOIN article_content AS c
        ON a.content_id = c.id`
    );

    return data.rows;
};

module.exports.getArticle = async (id) => {
    const data = await db.query(
        `SELECT a.id AS id,
                a.title AS title,
                a.views AS views,
                c.img AS img,
                c.paragraph AS text
        FROM article AS a
        JOIN article_content AS c
        ON a.content_id = c.id
        WHERE a.id = $1`,
        [id]
    );

    return data.rows
};

module.exports.saveNewArticle = async (title, views, img, text) => {
    const content = await db.query(
        `INSERT INTO article_content (img, paragraph) VALUES ($1, $2) RETURNING id`,
        [img, text]
    );

    await db.query(
        `INSERT INTO article (title, views, content_id) VALUES ($1, $2, $3)`,
        [title, views, content.rows[0].id]
    );
};

module.exports.changeArticle = async (id, title, views, img, text) => {
    const changeContent = await db.query(
        `UPDATE article_content set img = $1, paragraph = $2 WHERE id = $3 RETURNING id`,
        [img, text, id]
    );

    await db.query(
        `UPDATE article set title = $1, views = $2, content_id = $3 WHERE id = $4`,
        [title, views, changeContent.rows[0].id, id] 
    );
};

module.exports.deleteArticle = async (id) => {
    await db.query(
        `DELETE FROM article WHERE id = $1`,
        [id]
    );
    
    await db.query(
        `DELETE FROM article_content WHERE id = $1`,
        [id]
    );
};