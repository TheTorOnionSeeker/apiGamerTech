const { User } = require("../db.js");

async function getAllUsers(req, res) {
  try {
    const DBusers = await User.findAll({
      attributes: [
        "id",
        "name",
        "email",
        "isActive",
        "createdAt",
        "isAdmin",
        "uId",
        "imageUrl",
      ],
    });
    if (DBusers === null) throw new Error("Usuarios no encontrados!");
    res.status(200).json(DBusers);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "name",
        "email",
        "isActive",
        "createdAt",
        "isAdmin",
        "uId",
        "imageUrl",
      ],
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
    const user = await User.findOne({
      where: { name: { [Op.iLike]: `%${name}%` } },
      attributes: [
        "id",
        "name",
        "email",
        "isActive",
        "createdAt",
        "isAdmin",
        "uId",
        "imageUrl",
      ],
    });
    if (user === null) throw new Error("Usuario no encontrado!");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function searchUserByName(req, res) {
  const { name } = req.query;
  try {
    const users = await User.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      attributes: [
        "id",
        "name",
        "email",
        "isActive",
        "createdAt",
        "isAdmin",
        "uId",
        "imageUrl",
      ],
    });
    if (users === null) throw new Error("Usuario no encontrado!");
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createUser(req, res) {
  const { name, email, password, isActive } = req.body;
  try {
    let marcaTiempoLogin = Date.now();
    const new_user = await User.create({
      name: name,
      email: email,
      password: password,
      isActive: isActive,
      isAdmin: false,
    });
    if (!new_user) throw new Error("No se pudo crear el usuario!");
    res
      .status(201)
      .json({
        user: new_user,
        msg: "Usuario creado!",
        marcaTiempoLogin: marcaTiempoLogin,
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function loginWithGoogle(req, res) {
  const { uid, data } = req.body;
  try {
    let marcaTiempoLogin = Date.now();
    const user = await User.findOne({
      where: {
        uId: uid,
      },
      attributes: [
        "id",
        "name",
        "email",
        "isActive",
        "createdAt",
        "isAdmin",
        "uId",
        "imageUrl",
      ],
    });
    if (user) {
      res.status(200).json({
        user: user,
        msg: "Usuario encontrado!",
        marcaTiempoLogin: marcaTiempoLogin,
      });
    }
    const new_user = await User.create({
      uId: uid,
      name: data.name,
      email: data.email,
      imageUrl: data.picture,
      isActive: true,
      isAdmin: false,
    });
    if (!new_user) throw new Error("No se pudo crear el usuario");
    res.status(201).json({
      user: new_user,
      msg: "Usuario creado!",
      marcaTiempoLogin: marcaTiempoLogin,
    });
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
      attributes: [
        "id",
        "name",
        "email",
        "isActive",
        "createdAt",
        "isAdmin",
        "uId",
        "imageUrl",
      ],
    });
    if (!user) throw new Error("Usuario no encontrado!");
    let marcaTiempoLogin = Date.now();
    res.status(200).json({
      user: user,
      msg: "Usuario encontrado!",
      marcaTiempoLogin: marcaTiempoLogin,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function modifyUser(req, res) {
  const { id, name, email, password, isActive, isAdmin, imageUrl } = req.body;
  try {
    const user = await User.update(
      {
        name: name,
        email: email,
        password: password,
        isActive: isActive,
        isAdmin: isAdmin,
        imageUrl: imageUrl,
      },
      { where: { id: id } }
    );
    res.status(200).json({ user: user, msg: "Usuario modificado!" });
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
  modifyUser,
  loginWithGoogle,
  searchUserByName,
};
