const express = require("express");
const {
  createUser,
  listUsers,
  updateUser,
  deleteUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/users", createUser);
router.get("/users", listUsers);
router.put("/users", updateUser);
router.delete("/users", deleteUserById);

module.exports = router;
