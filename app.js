require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })

const cors = require("cors");
const express = require('express');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({
    type: 'application/json',
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,

}));

app.set("trust proxy", 1),
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "sessions",
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
  })
);

const usersRoute = require('./routes/users');
const produitsRoute = require('./routes/produits');

app.use('/users', usersRoute);
app.use('/produits', produitsRoute);

app.get('/api', (_, res) => res.send("Hello from API v1"));

app.listen(process.env.APP_PORT, () => console.log(`Back end is running on PORT ${process.env.APP_PORT}`));

module.exports = app;