const { Router } = require("express");
const router = Router();
const {
  createCart,
  getCartByUserId,
  addProductToCart,
} = require("../controllers/cart.controllers.js");

/* router.get('/deleteCart',deleteCart)
router.post('/modifyCart',modifyCart) */
router.post("/new", createCart);
router.post("/addproducttocart", addProductToCart);
router.get("/:id", getCartByUserId);
//router.put('/:id', resetCart)

module.exports = router;
