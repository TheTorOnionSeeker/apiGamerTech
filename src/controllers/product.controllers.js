const { Product } = require("../db.js");
const { Op } = require("sequelize");

function ordenarObjetos(propiedad, sentido, funcionOrdenamiento) {
  let llaveOrdenamiento = funcionOrdenamiento
    ? function (objeto) {
        return funcionOrdenamiento(objeto[propiedad]);
      }
    : function (objeto) {
        return objeto[propiedad];
      };
  sentido = !sentido ? 1 : -1;
  return function (objeto1, objeto2) {
    return (
      (objeto1 = llaveOrdenamiento(objeto1)),
      (objeto2 = llaveOrdenamiento(objeto2)),
      sentido * ((objeto1 > objeto2) - (objeto2 > objeto1))
    );
  };
}

async function getAllProducts(req, res) {
  try {
    const DBproducts = await Product.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "imageUrl",
        "isActive",
        "stock",
        "category",
        "reviewsScores",
        "reviewsTexts",
      ],
      where: null,
    });
    res.status(200).json(DBproducts);
  } catch (error) {
    res.status(404).json("Productos no encontrados!");
  }
}

async function deleteProducts(req, res) {
  try {
    await Product.destroy({
      where: {},
      truncate: true,
    });

    res.status(200).json("Todos los productos han sido eliminados");
  } catch (error) {
    res.status(500).json("Error al eliminar los productos");
  }
}

async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "name",
        "description",
        "price",
        "imageUrl",
        "isActive",
        "stock",
        "reviewsScores",
        "reviewsTexts",
      ],
    });
    if (product === null) throw new Error("Producto no encontrado!");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getProductByName(req, res) {
  const { name } = req.query;
  try {
    const product = await Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
    });
    if (product === null) throw new Error("Producto no encontrado!");
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function createProduct(req, res) {
  const { name, description, price, imageUrl, isActive, stock, category } =
    req.body;
  try {
    const new_product = await Product.create({
      name: name,
      description: description,
      price: price,
      imageUrl: imageUrl,
      isActive: isActive,
      stock: stock,
      category: category,
    });
    if (!new_product) throw new Error("No se pudo crear el producto!");
    res.status(201).json({ product: new_product, msg: "Producto creado!" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

async function modifyProduct(req, res) {
  const { id, name, description, price, imageUrl, isActive, stock } = req.body;
  try {
    const product = await Product.update(
      {
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl,
        isActive: isActive,
        stock: stock,
      },
      { where: { id: id } }
    );
    res.status(200).json({ product: product, msg: "Producto modificado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const sortProducts = async (req, res) => {
  const { array, sort, type } = req.body;
  try {
    if (array.length === 0) throw new Error("Arreglo vacio");
    const valor = sort === "ascendente" ? false : true;
    if (type === "") {
      if (sort === "ascendente")
        return res.status(200).json(array.sort((a, b) => a.id - b.id));
      else if (sort === "descendente")
        return res.status(200).json(array.sort((a, b) => b.id - a.id));
      else throw new Error("Error en el parametro sort");
    } else {
      const response = array.sort(ordenarObjetos(type, valor));
      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

async function addReviewScore(req, res) {
  let { textReview, score, productId } = req.body;
  try {
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });
    if (product === null) throw new Error("Producto no encontrado!");
    const updatedProduct = await Product.update(
      {
        reviewsScores: [...product.reviewsScores, score], // Agrega el nuevo score al array de scores
        reviewsTexts: [...product.reviewsTexts, textReview],
      },
      {
        where: {
          id: productId,
        },
      }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteReviewScore(req, res) {
  let { reviewId, productId } = req.body;

  try {
    const product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    if (product === null) {
      throw new Error("Producto no encontrado!");
    }

    const updatedScores = product.reviewsScores.filter(
      (score) => score.userId !== reviewId
    );
    const updatedTexts = product.reviewsTexts.filter(
      (text) => text.userId !== reviewId
    );

    const updatedProduct = await Product.update(
      {
        reviewsScores: updatedScores,
        reviewsTexts: updatedTexts,
      },
      {
        where: {
          id: productId,
        },
      }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getAllCategories(req, res) {
  try {
    const DBproducts = await Product.findAll({
      attributes: [
        "category"
      ],
      where: null,
    });
    res.status(200).json(DBproducts);
  } catch (error) {
    res.status(404).json("Categorías no encontradas!");
  }
}

module.exports = {
  getProductByName,
  getAllProducts,
  getProductById,
  createProduct,
  modifyProduct,
  sortProducts,
  addReviewScore,
  deleteReviewScore,
  deleteProducts,
  getAllCategories,
};
