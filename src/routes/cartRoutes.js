const { Router } = require("express");
const router = Router();
const {
  createCart,
  getCartByUserId,
  addProductToCart,
} = require("../controllers/cart.controllers.js");

router.post("/new", createCart);
router.post("/addproducttocart", addProductToCart);
router.get("/:id", getCartByUserId);

module.exports = router;
