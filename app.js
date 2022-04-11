require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })

const cors = require("cors");
const express = require('express');

const session = require('express-session');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");

const app = express();

app.use(cookieSession({
  name: 'session',
  keys: "ghsdhqsg",

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(express.json({
    type: 'application/json',
}));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: 'ma_session_super_key',
    secret: 'ma_session_super_secret_key',
    saveUninitialized: false,
    resave: false,
  })
);

const usersRoute = require('./routes/users');
const produitsRoute = require('./routes/produits');

app.use('/users', usersRoute);
app.use('/produits', produitsRoute);

app.get('/api', (_, res) => res.send("Hello from API v1"));

app.listen(process.env.APP_PORT, () => console.log(`Back end is running on PORT ${process.env.APP_PORT}`));

module.exports = app;