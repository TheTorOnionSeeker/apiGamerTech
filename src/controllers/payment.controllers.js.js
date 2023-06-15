const mercadopago = require("mercadopago");

async function createPreference(req, res) {
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "http://localhost:5173/payment/success",
      failure: "http://localhost:5173/payment/failure",
      pending: "http://localhost:5173/payment/pending",
      /* success: "https://your-gammer-tech.vercel.app/payment/success",
      failure: "https://your-gammer-tech.vercel.app/payment/failure",
      pending: "https://your-gammer-tech.vercel.app/payment/pending", */
    },
    auto_return: "approved",
  };

  try {
    mercadopago.preferences.create(preference).then(function (response) {
      res.status(201).json({
        id: response.body.id,
      });
    });
  } catch (error) {
    res.status(400).json("Falló la creación del pago!");
  }
}

module.exports = {
  createPreference,
};
