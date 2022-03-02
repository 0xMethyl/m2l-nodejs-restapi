const router = require('express-promise-router')();

const { 
    retrieveProduits
} = require('../controllers/users');

router.route("/all")
    .get(retrieveProduits)

module.exports = router;