const { userService } = require('../services/index');

const userLogin = async (req, res) => {
    const { type, message } = await userService.userLogin(req.body);
    if (type !== 200) return res.status(type).json({ message });

    res.status(type).json(message);
};

const create = async (req, res) => {
    const { type, message } = await userService.create(req.body);
    if (type !== 201) return res.status(type).json({ message });

    res.status(type).json(message);
};

const findAll = async (_req, res) => {
    const { type, message } = await userService.findAll();
    res.status(type).json(message);
};

const findById = async (req, res) => {
    const { id } = req.params;
    const { type, message } = await userService.findById(id);

    if (type !== 200) return res.status(type).json({ message });

    res.status(type).json(message);
};

const remove = async (req, res) => {
    const { id } = req.user.payload;
    const { type, message } = await userService.remove(id);
    res.status(type).json(message);
  };

module.exports = {
    userLogin,
    create,
    findById,
    findAll,
    remove,
};