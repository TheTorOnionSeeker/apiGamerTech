const { Router } = require("express");
const router = Router();
const {
  getAllPurchases,
  getPurchaseByUserId,
  createPurchase,
} = require("../controllers/purchase.controllers.js");

router.post("/new", createPurchase);
router.get("/", getAllPurchases);
router.get("/:userid", getPurchaseByUserId);

module.exports = router;
