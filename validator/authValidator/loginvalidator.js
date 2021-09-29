const {body}=require('express-validator')
const bcrypt = require('bcrypt')
const Users = require('../../models/user');
module.exports=[
    body('email')
    .not().isEmpty().withMessage("please provide a valid email")
    .isEmail().withMessage("please provide a valid email")
    .normalizeEmail()
    ,
    body('password')
    .isLength({min:5}).withMessage("Your password must be greater than 6 chars")
]
