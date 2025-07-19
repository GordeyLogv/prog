const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports.hashPassword = async (password) => {
    return await bcrypt.hash(password, 9);
};

module.exports.comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
};

module.exports.createAccessToken = (person) => {
    return jwt.sign(
        {
            "id": person.id,
            "username": person.username,
            "role": person.role,
            "age": person.age
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10d"}
    );
};

// module.exports.createRefreshToken = (person) => {
//     return jwt.sign(
//         {
//             "id": person.id,
//             "username": person.username,
//             "role": person.role,
//             "age": person.age
//         },
//         process.env.REFRESH_TOKEN_SECRET,
//         { expiresIn: "30d" }
//     );
// }