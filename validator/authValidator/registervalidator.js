const {
    body
} = require('express-validator')
const Users = require('../../models/user');
module.exports = [
    body('name')
    .isLength({
        min: 2,
        max: 15
    }).withMessage('Username must be beetween 2 to 15')
    .custom(async name => {
        let user = await Users.findOne({
            name
        })
        if (user) {
            return Promise.reject("User alrady exits")
        }
    })
    .trim(),
    body('email')
    .isEmail().withMessage("please provide a valid email")
    .custom(async email => {
        let useremail = await Users.findOne({
            email
        })
        if (useremail) {
            return Promise.reject("Email alrady exits")
        }
    })
    .normalizeEmail(),
    body('password')
    .isLength({
        min: 5
    }).withMessage("Your password must be greater than 6 chars"),
    body('confirmPassword')
    .custom((cpassword, {
        req
    }) => {
        if (cpassword !== req.body.password) {
            throw new Error('password does not match')
        }
        return true
    })
]