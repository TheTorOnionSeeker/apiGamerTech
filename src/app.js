const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");
const { User } = require("./db.js");

/* const stripe = require("stripe")(
  "sk_test_51Mwy6OIafxu5FBCfUflrOLZaYawloNP6Js3S76LYjloojg9K5qjMIA51Z9lowfW7IZdOcCTK9DRgvZEwtJW5Q9nY00Zca3Y2fw"
); */

require("./db.js");

const server = express();

server.name = "API";

//server.use(express.static("public"));

//const YOUR_DOMAIN = "http://localhost:5173/premium";

/* server.post("/create-checkout-session/:name", async (req, res) => {
  const {name}=req.params;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "price_1MxBp3Iafxu5FBCf4zF8kwvX",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true?name=${name}`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  const user = await User.findOne({
    where: {
      name: name,
    }
  });

  if(session.url === `${YOUR_DOMAIN}?success=true?name=${name}`) user.isPremium=true;

  res.redirect(303, session.url);
}); */

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use(cors());
/* server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
}); */

server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;