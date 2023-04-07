const schemas = require('./schemas');

const validateCreateUser = (body) => {
    const { error } = schemas.createUser.validate(body);
    if (error) return error.message;
    return null;
};

module.exports = {
    validateCreateUser,
};