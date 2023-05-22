const { Product } = require("../db.js");

async function getAllProducts(req, res) {
  try {
    const DBproducts = await Product.findAll({
      attributes: ["id", "name", "description", "price", "imageUrl"],
    });
    res.status(200).json(DBproducts);
  } catch (error) {
    res.status(404).json("Products not found!");
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "name", "description", "price", "imageUrl"],
    });
    if (product === null) throw new Error("Product not found!");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProductByName(req, res) {
  const { name } = req.query;
  try {
    const product = await Product.findOne({
      where: {
        name: name,
      },
      attributes: ["id", "name", "description", "price", "imageUrl"],
    });
    if (product === null) throw new Error("Product not found!");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  const { name, description, price, imageUrl } = req.body;
  try {
    const new_product = await Product.create({
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
    });
    if (!new_product) throw new Error("No se pudo crear el producto");
    res.status(201).json({ product: new_product, msg: "Product created" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function modifyProduct(req, res) {
  const { id, name, description, price, imageUrl } = req.body;
  try {
    const product = await Product.update(
      {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
      },
      { where: { id: id } }
    );
    res.status(200).json({ product: product, msg: "Product updated" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  modifyProduct
};
