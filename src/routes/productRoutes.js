const { Router } = require("express");
const router = Router();
const {
  getAllProducts,
  getProductById,
  getProductByName,
  createProduct,
  modifyProduct,
  sortProducts,
  addReviewScore,
  deleteReviewScore,
  deleteProducts,
} = require("../controllers/product.controllers.js");

router.get("/search", getProductByName);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/sort", sortProducts);
router.post("/new", createProduct);
router.post("/modifyproduct", modifyProduct);
router.post('/addreviewscore', addReviewScore)
router.post('/deletereviewscore', deleteReviewScore)
router.post('/deletereviewscore', deleteReviewScore)
router.delete('/deleteproducts', deleteProducts)

module.exports = router;
