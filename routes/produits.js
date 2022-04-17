const router = require('express-promise-router')();

const { 
    getAll,
    getById,
    search
} = require('../controllers/produits');

router.route("/")
    .get(getAll);

router.route("/:id")
    .get(getById);

router.route("/search/:keyword")
    .get(search);

module.exports = router;