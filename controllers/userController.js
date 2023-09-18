const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  listUsers,
};
