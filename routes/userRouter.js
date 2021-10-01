const router = require('express').Router()
const cors = require('cors')

const { registerUser, getUsers } = require('../controllers/userController')

router.route('/').get(getUsers)
router.route('/register').post(registerUser)

module.exports = router
