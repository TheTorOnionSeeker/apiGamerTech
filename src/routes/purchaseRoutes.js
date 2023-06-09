const { Router } = require("express");
const router = Router();
const {
  getAllPurchases,
  getPurchaseByUserId,
  createPurchase,
  deleteAllPurchases,
} = require("../controllers/purchase.controllers.js");

router.post("/new", createPurchase);
router.get("/", getAllPurchases);
router.get("/:userid", getPurchaseByUserId);
router.delete("/deleteallpurchases", deleteAllPurchases);

module.exports = router;
