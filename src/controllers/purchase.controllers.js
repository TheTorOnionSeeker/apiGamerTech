const { Purchase, User, Cart } = require("../db.js");

async function createPurchase(req, res) {
  const { productId, userId } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user === null) throw new Error("Usuario no encontrado!");
    const new_purchase = await Purchase.create();
    if (!new_purchase) throw new Error("No se pudo crear la compra");
    if (user !== null) await new_purchase.setUser(user);
    /* const purchase = await Purchase.findOne({
      where: {
        userId: userId,
      },
    }); */
    const updatedPurchase = await Purchase.update(
      {
        productsId: productId, // Agrega el nuevo productId al array
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    const deletedCart = await Cart.destroy({
      where: {
        userId: userId,
      },
    });

    if (deletedCart === 0) {
      throw new Error("No se encontró un carrito asociado a ese userId!");
    }
    res.status(201).json({
      purchase: updatedPurchase,
      msg: "Compra creada y carrito eliminado!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllPurchases(req, res) {
  try {
    const DBPurchases = await Purchase.findAll({
      attributes: ["id", "productsId", "userId"],
    });
    res.status(200).json(DBPurchases);
  } catch (error) {
    res.status(400).json("Compras no encontradas!");
  }
}

async function getPurchaseByUserId(req, res) {
  const { userid } = req.params;
  try {
    const purchases = await Purchase.findAll({
      where: {
        userId: userid,
      },
      attributes: ["id", "productsId", "userId"],
    });
    if (purchases === null)
      throw new Error("Compras de usuario no encontradas!");
    res.status(200).json(purchases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteAllPurchases(req, res) {
  try {
    const deletedPurchases = await Purchase.destroy({
      where: {},
    });

    if (deletedPurchases === 0) {
      throw new Error("No se pudieron eliminar todas las compras históricas!");
    }
    res.status(200).json("Compras históricas eliminadas!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseByUserId,
  deleteAllPurchases,
};
