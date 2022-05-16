const router = require('express-promise-router')();

const { 
    getAll,
    getById,
    getAllCategory,
    getByCategory,
    getStockById,
    search,
    addToCart
} = require('../controllers/produits');

router.route("/")
    .get(getAll);

router.route("/categories")
    .get(getAllCategory);

router.route("/categories/:id")
    .get(getByCategory);

router.route("/:id")
    .get(getById);

router.route("/stock/:id")
    .get(getStockById);

router.route("/search/:keyword")
    .get(search);

router.route("/addToCart/:id/:qty")
    .get(addToCart);

module.exports = router;