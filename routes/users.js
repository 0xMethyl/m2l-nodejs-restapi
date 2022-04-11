const router = require('express-promise-router')();

const { 
    selectAll,
    retrieveUsersData,
    loginG,
    loginP,
    register,
    disconnect,
    checkLoginStatus
} = require('../controllers/users');

router.route('/')
    .get(selectAll)

router.route('/login')
    .get(loginG)

router.route("/login")
    .get(checkLoginStatus)
    .post(loginP)

router.route("/retrieveUsersData")
    .get(retrieveUsersData)

router.route("/register")
    .post(register)

router.route("/allUsers")
    .get(selectAll)

router.route("/disconnect")
    .get(disconnect)

module.exports = router;