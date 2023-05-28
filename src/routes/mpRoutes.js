const { Router } = require("express");
const router = Router();
const { createPreference } = require("../controllers/payment.controllers.js");

router.post("/create_preference", createPreference);

module.exports = router;
