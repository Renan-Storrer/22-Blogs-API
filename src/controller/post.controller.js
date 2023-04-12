const { postService } = require('../services');

const create = async (req, res) => {
  const { id } = req.user.payload;
  const { type, message } = await postService.create(id, req.body);
  if (type !== 201) return res.status(type).json({ message });
  res.status(type).json(message);
};

const findAll = async (_req, res) => {
  const { type, message } = await postService.findAll();
  res.status(type).json(message);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postService.findById(id);
  if (type !== 200) return res.status(type).json({ message });
  res.status(type).json(message);
};


module.exports = {
  create,
  findAll,
  findById,
};