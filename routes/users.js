const router = require('express-promise-router')();

const { 
    selectAll,
    login,
    register

} = require('../controllers/users');

router.route('/')
    .get(selectAll)

router.route("/login")
    .post(login)

router.route("/register")
    .post(register)

module.exports = router;