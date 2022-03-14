require('dotenv').config({ path: `./config/${process.env.NODE_ENV}.env` })

const express = require('express');
const session = require('express-session');

const app = express();

const cors = require('cors');
app.use(cors())

app.use(express.json({
    type: 'application/json',
  }));

const usersRoute = require('./routes/users');
const produitsRoute = require('./routes/produits');

app.use('/users', usersRoute);
app.use('/produits', produitsRoute);

app.get('/api', (_, res) => res.send("Hello from API v1"));

app.listen(process.env.APP_PORT, () => console.log(`Back end is running on PORT ${process.env.APP_PORT}`));

module.exports = app;