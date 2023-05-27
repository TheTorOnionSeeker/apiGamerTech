const { Cart, User } = require("../db.js");

async function createCart(req, res) {
  const { productId, userId } = req.body;
  try {
    const new_cart = await Cart.create({
      productsId: productId,
    });
    if (!new_cart) throw new Error("No se pudo crear el carrito");
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user !== null) await new_cart.setUser(user);
    if (user === null) throw new Error("Usuario no encontrado!");
    res.status(201).json({ cart: new_cart, msg: "Carrito creado" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function getCartByUserId(req, res) {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({
      where: {
        userId: id,
      },
      attributes: ["productsId", "userId"],
    });
    if (cart === null) throw new Error("Carrito no encontrado!");
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function addProductToCart(req,res) {
  let { productId, userId } = req.body;
  try {
    const cart = await Cart.findOne({
      where: {
        userId: userId,
      },
    });
    if (cart === null) throw new Error("Carrito no encontrado!");
    cart.productsId.push(productId);
    await cart.save();
    res.status(200).json("Producto añadido!");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createCart,
  getCartByUserId,
  addProductToCart
};
