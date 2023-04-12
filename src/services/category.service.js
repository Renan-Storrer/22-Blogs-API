const { Category } = require('../models');

const create = async ({ name }) => {
  if (!name) return { type: 400, message: '"name" is required' };
  const categoryCreated = await Category.create({ name });
  return { type: 201, message: categoryCreated };
};

module.exports = {
  create,
}