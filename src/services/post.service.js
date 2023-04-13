const { Category, BlogPost, PostCategory, User } = require('../models');

const create = async (id, body) => {
  const { title, content, categoryIds } = body;

  const idInvalid = {
    type: 400,
    message: 'one or more "categoryIds" not found',
  };

  if (categoryIds.length === 0) return idInvalid;

  const verifyAllCategories = await Promise.all(
    categoryIds.map(async (e) => Category.findByPk(e)),
  );

  if (verifyAllCategories.some((e) => e === null)) return idInvalid;

  const newPost = await BlogPost.create({ title, content, userId: id });
  const createdPost = await BlogPost.findByPk(newPost.id);

  const postId = 'post_id';
  const categoryId = 'category_id';

  const objects = categoryIds.map((e) => ({ [postId]: createdPost.id, [categoryId]: +e }));

  await PostCategory.bulkCreate(objects);

  return { type: 201, message: createdPost };
};

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return { type: 200, message: posts };
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  if (!post) return { type: 404, message: 'Post does not exist' };
  return { type: 200, message: post };
};

const update = async (id, body) => {
  const { title, content, userId } = body;
  const postUpdate = await findById(id);

  if (postUpdate.message.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }

  await BlogPost.update(
    { title, content },
    {
      where: { id },
    },
  );

  const upatedPost = await findById(id);

  return { type: 200, message: upatedPost.message };
};

const remove = async (id, userId) => {
  const postDelete = await BlogPost.findByPk(id);
  if (!postDelete) return { type: 404, message: 'Post does not exist' };
  if (postDelete.userId !== userId) {
    return { type: 401, message: 'Unauthorized user' };
  }
  await BlogPost.destroy({ where: { id } });

  return { type: 204, message: '' };
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  remove,
};