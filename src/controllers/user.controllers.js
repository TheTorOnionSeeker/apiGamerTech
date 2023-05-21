const { User } = require("../db.js");

async function getAllUsers(req, res) {
  try {
    const DBusers = await User.findAll({
      attributes: ["id", "name", "email"],
    });
    if (DBusers === null) throw new Error("Usuarios no encontrados!")
    res.status(200).json(DBusers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.FindOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "email"],
    });
    if (user === null) throw new Error("Usuario no encontrado!");
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
      attributes: ["id", "name", "email"],
    });
    if (user === null) throw new Error("Usuario no encontrado!");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const new_user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    if (!new_user) throw new Error("No se pudo crear el usuario!");
    res.status(201).json({ user:{
        id:new_user.id,
        name:new_user.name,
        email:new_user.email},
    msg: "Usuario creado!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function verifyUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email,
        password: password,
      },
      attributes: ["id", "name", "email"],
    });
    if (!user) throw new Error("Usuario no encontrado!");

    res.status(201).json({ user: user, msg: "Usuario encontrado!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function modifyUser(req, res) {
  const { id, name, email, password } = req.body;
  try {
    const user = await User.update(
      {
        name: name,
        email: email,
        password: password,
      },
      { where: { id: id } }
    );
    res.status(200).json({ User: user, msg: "Usuario modificado!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  createUser,
  verifyUser,
  modifyUser
};
