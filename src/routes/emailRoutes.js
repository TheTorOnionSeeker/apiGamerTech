const { Router } = require("express");
const router = Router();
const {
  sendRegisterMail,
  sendPaymentSuccessMail,
} = require("../controllers/nodemailer.controllers.js");

router.post("/", sendRegisterMail);
router.post("/paymentsuccess", sendPaymentSuccessMail);

module.exports = router;
