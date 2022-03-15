const router = require('express-promise-router')();

const { 
    selectAll,
    retrieveUsersData,
    login,
    register,
    disconnect,
    checkLoginStatus
} = require('../controllers/users');

router.route('/')
    .get(selectAll)

router.route("/login")
    .get(checkLoginStatus)
    .post(login)

router.route("/retrieveUsersData")
    .get(retrieveUsersData)

router.route("/register")
    .post(register)

router.route("/allUsers")
    .get(selectAll)

router.route("/disconnect")
    .get(disconnect)

module.exports = router;