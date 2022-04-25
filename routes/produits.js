const router = require('express-promise-router')();

const { 
    getAll,
    getById,
    getAllCategory,
    getByCategory,
    search
} = require('../controllers/produits');

router.route("/")
    .get(getAll);

router.route("/categories")
    .get(getAllCategory);

router.route("/categories/:id")
    .get(getByCategory);

router.route("/:id")
    .get(getById);

router.route("/search/:keyword")
    .get(search);

module.exports = router;