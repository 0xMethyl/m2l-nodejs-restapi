const router = require('express-promise-router')();

const { 
    getAll
} = require('../controllers/produits');

router.route("/")
    .get(getAll)

module.exports = router;