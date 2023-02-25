const jwt = require('jsonwebtoken');

const getJWT = (userInfo, secretKey) => {
    return jwt.sign(
        {
            id: userInfo.id,
            email: userInfo._email
        },
        secretKey, {
            expiresIn: 999999
        }

    );
};

module.exports = getJWT