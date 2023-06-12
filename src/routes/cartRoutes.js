const { Router } = require("express");
const router = Router();
const {
  createCart,
  getCartByUserId,
  addProductToCart,
  deleteItem
} = require("../controllers/cart.controllers.js");

router.post("/new", createCart);
router.post("/addproducttocart", addProductToCart);
router.get("/:id", getCartByUserId);
router.delete('/:userId/products/:itemId', deleteItem)

module.exports = router;
