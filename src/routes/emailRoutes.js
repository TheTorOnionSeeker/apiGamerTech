const { Router } = require("express");
const router = Router();
const { sendMail } = require("../controllers/nodemailer.controllers.js");

router.post("/", sendMail);

module.exports = router;
