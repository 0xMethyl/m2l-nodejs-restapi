const router = require('express-promise-router')();

const { 
    selectAll,
    retrieveUsersData,
    loginG,
    loginP,
    register,
    logout,
} = require('../controllers/users');

router.route('/')
    .get(selectAll)

router.route('/login')
    .get(loginG) 

router.route("/login")
    .get(loginG)
    .post(loginP)

router.route("/retrieveUsersData")
    .get(retrieveUsersData)

router.route("/register")
    .post(register)

router.route("/allUsers")
    .get(selectAll)

router.route("/logout")
    .post(logout)

module.exports = router;