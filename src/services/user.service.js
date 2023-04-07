const { User } = require('../models');
const JWT = require('../utils/JWT');
const validations = require('../validations/validateInput');

const userLogin = async ({ email, password }) => {
  const users = await User.findAll();
  const exits = users.find(
    (e) => e.email === email && e.password === password,
  );
  if (!exits) return { type: 400, message: 'Invalid fields' };

  const token = JWT.generateToken({ id: exits.id, email });
  return { type: 200, message: { token } };
};

const create = async (body) => {
    const error = validations.validateCreateUser(body);
    if (error) return { type: 400, message: error };
    const { displayName, email, password, image } = body;

    const users = await User.findAll();
    const exits = users.find(
        (e) => e.email === email && e.password === password,
    );

    if (exits) return { type: 409, message: 'User already registered' };

    await User.create({
        displayName,
        email,
        password,
        image,
    });

    const token = JWT.generateToken({ displayName, email, image });

    return { type: 201, message: { token } };
};

const findAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { type: 200, message: users };
};

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return { type: 404, message: 'User does not exist' };

  return { type: 200, message: user };
};

const remove = async (id) => {
  await User.destroy({
    where: { id },
  });

  return { type: 204, message: '' };
};

module.exports = {
  userLogin,
  create,
  findAll,
  findById,
  remove,
};