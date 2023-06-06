const { Router } = require("express");
const router = Router();

const productRouter = require("./productRoutes");
const usersRouter = require("./usersRoutes");
const cartRouter = require("./cartRoutes");
const mpRouter = require("./mpRoutes");
const purchaseRouter = require("./purchaseRoutes");

router.use("/product", productRouter);
router.use("/users", usersRouter);
router.use("/cart", cartRouter);
router.use("/payment", mpRouter);
router.use("/purchase", purchaseRouter);

module.exports = router;
