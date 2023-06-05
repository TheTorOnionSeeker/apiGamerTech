const { Router } = require("express");
const router = Router();
const {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  modifyUser,
  verifyUser,
  loginWithGoogle,
  searchUserByName
} = require("../controllers/user.controllers.js");

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.get("/:name", getUserByName);
router.get("/search", searchUserByName);
router.post("/new", createUser);
router.post("/modifyuser", modifyUser);
router.post("/verifyuser", verifyUser);
router.post("/loginwithgoogle", loginWithGoogle)

module.exports = router;
