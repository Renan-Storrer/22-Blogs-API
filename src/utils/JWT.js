const JWT = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (payload, expiresIn = '1d') => {
    const JWTConfig = {
      algorithm: 'HS256',
      expiresIn,
    };
    
const token = JWT.sign({ payload }, JWT_SECRET, JWTConfig);

return token;
};

module.exports = {
    generateToken,
};