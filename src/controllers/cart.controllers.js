const { Cart, User } = require("../db.js");

async function createCart(req, res) {
  const { productId, userId } = req.body;
  try {
    const new_cart = await Cart.create();
    if (!new_cart) throw new Error("No se pudo crear el carrito");
    new_cart.productsId.push(productId);
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

async function addProductToCart(req, res) {
  let { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({
      where: {
        userId: userId,
      },
    });
    if (cart === null) {
      cart = await Cart.create();
      //cart.productsId.push(productId);
    }
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user === null) throw new Error("Usuario no encontrado!");
    if (user !== null) await cart.setUser(user);
    const updatedCart = await Cart.update(
      {
        productsId: [...cart.productsId, productId], // Agrega el nuevo productId al array
      },
      {
        where: {
          userId: userId,
        },
      }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteItem(req, res) {
  const { userId, itemId } = req.params;

  try {
    // Paso 1: Buscar el carrito correspondiente al userId
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) throw new Error("Carrito no encontrado!")

    // Paso 2: Obtener el array productsId del carrito
    const productsId = cart.productsId;

    // Paso 3: Eliminar el objeto con el id igual a itemId del array
    const updatedProductsId = productsId.filter(
      (product) => product.id !== itemId
    );

    // Paso 4: Actualizar el carrito en la base de datos
    await cart.update({ productsId: updatedProductsId });

    return res.status(200).json({ message: "Producto eliminado del carrito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

module.exports = {
  createCart,
  getCartByUserId,
  addProductToCart,
  deleteItem,
};
