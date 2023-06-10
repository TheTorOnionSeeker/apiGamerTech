const nodemailer = require("nodemailer");

function sendMail(req, res) {
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
    to: "nicoyabichino@gmail.com",
    subject: "enviado desde GamerTech Inc.",
    text: "Registro exitoso, !Bienvenido a GamerTech!",
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
  sendMail,
};
