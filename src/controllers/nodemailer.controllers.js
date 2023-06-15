const nodemailer = require("nodemailer");

function sendRegisterMail(req, res) {
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "nicoyabichino@gmail.com",
      pass: "ctjegscjutdbttos",
    },
  });

  const mailOptions = {
    from: "GamerTech",
    to: email,
    subject: "enviado desde GamerTech Inc.",
    text: "¡Registro exitoso! ¡Bienvenido a GamerTech!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).json(req.body);
    }
  });
}

function sendPaymentSuccessMail(){
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "nicoyabichino@gmail.com",
      pass: "ctjegscjutdbttos",
    },
  });

  const mailOptions = {
    from: "GamerTech",
    to: email,
    subject: "enviado desde GamerTech Inc.",
    text: "¡Pago exitoso! ¡Gracias por tu compra!",
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      console.log("email enviado");
      res.status(200).json(req.body);
    }
  });
}

module.exports = {
  sendRegisterMail,
  sendPaymentSuccessMail
};
