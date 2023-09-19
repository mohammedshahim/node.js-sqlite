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
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id, name, email } = req.body;

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user attributes
    user.name = name;
    user.email = email;

    // Save the changes to the database
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.query; // Get the ID from request parameters

    // Find the user by ID
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the user
    await user.destroy();

    res.status(204).json(); // 204 No Content for successful deletion
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const findUsersByLimit = async (req, res) => {
  try {
    const { start, limit } = req.query; // Get start and limit from query parameters

    const options = {
      offset: start ? parseInt(start) : 0, // Convert start to an integer or default to 0
      limit: limit ? parseInt(limit) : 10, // Convert limit to an integer or default to 10
      order: [["id", "ASC"]], // Order by the 'id' column in ascending order (DESC for decending order)
    };

    const users = await User.findAll(options);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createUser,
  listUsers,
  updateUser,
  deleteUserById,
  findUsersByLimit,
};
