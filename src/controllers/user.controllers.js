const { User } = require("../db.js");

async function getAllUsers(req, res) {
  try {
    const DBusers = await User.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json(DBusers);
  } catch (error) {
    res.status(404).json("Products not found!");
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.FindOne({
      where: {
        id: id,
      },
      attributes: ["id", "name"],
    });
    if (user === null) throw new Error("User not found!");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getUserByName(req, res) {
  const { name } = req.params;
  try {
    const user = await User.FindOne({
      where: {
        name: name,
      },
      attributes: ["id", "name"],
    });
    if (user === null) throw new Error("User not found!");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createUser(req, res) {
  const { name, password } = req.body;
  try {
    const new_user = await User.create({
      name: name,
      password: password
    });
    if (!new_user) throw new Error("No se pudo crear el usuario");
    res.status(201).json({ User: new_user, msg: "User created" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function modifyUser(req, res) {
  const { id, name, password } = req.body;
  try {
    const user = await User.update(
      {
        name: name,
        password: password
      },
      { where: { id: id } }
    );
    res.status(200).json({ User: user, msg: "User updated" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  modifyUser
};