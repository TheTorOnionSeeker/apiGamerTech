const { Router } = require("express");
const router = Router();
const {
  createCart,
  getCartByUserId,
  addProductToCart,
  deleteItem,
  addCartFromLocalStorage
} = require("../controllers/cart.controllers.js");

router.post("/new", createCart);
router.post("/addproducttocart", addProductToCart);
router.get("/:id", getCartByUserId);
router.post('/deleteitem', deleteItem)
router.post('/addcartfromlocalstorage', addCartFromLocalStorage)

module.exports = router;
