const { postService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user.payload;
  const { type, message } = await postService.create(id, req.body);
  if (type !== 201) return res.status(type).json({ message });
  res.status(type).json(message);
};

module.exports = {
  create,
};