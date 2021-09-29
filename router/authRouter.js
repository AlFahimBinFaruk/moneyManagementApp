const router = require('express').Router()

const {
    registerPostController,
    loginPostController,
    allUser
} = require('../controller/authController')

const registerValidator=require('../validator/authValidator/registervalidator')
const loginvalidator=require('../validator/authValidator/loginvalidator')

router.get('/all',allUser)

router.post('/register',registerValidator,registerPostController)



router.post('/login',loginvalidator,loginPostController)



module.exports = router