const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const {
    validationResult
} = require('express-validator')
const Users = require('../models/user');
const errorformat = require('../utils/errorformator');
const User = require('../models/user');

//register

exports.registerPostController = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;


    let error = validationResult(req).formatWith(errorformat)
    if (!error.isEmpty()) {
        return res.status(400).json(error.mapped())
    }


    try {
        let hashpassword = await bcrypt.hash(password, 11)
        let users = new Users({
            name,
            email,
            password: hashpassword,
            income:0,
            expense:0,
            balance:0,
            transaction:[]
        })
        await users.save();
        res.status(201).json({message:'user created successfully'})

    } catch (e) {
        res.status(500).json({message:'Internal server error!'})
    }
}


//login
exports.loginPostController = async (req, res) => {
    const {
        email,
        password
    } = req.body;


    let error = validationResult(req).formatWith(errorformat)
    if (!error.isEmpty()) {
        return res.status(400).json(error.mapped())
    }


    try {
        const user = await Users.findOne({
            email
        })

        if (!user) {
            return res.status(400).json({message:'Invalid Credentials'})
        }
        let match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(400).json({message:'Invalid Credentials'})
        }
        let token=jwt.sign({
            _id:user._id,
            name:user.name,
            email:user.email,
            income:user.income,
            expense:user.expense,
            balance:user.balance,
            transaction:user.transaction
        },'SECRET',{expiresIn:'2h'})

        res.status(200).json({
            message:"login successfull",
            token:`Bearer ${token}`
        })

        
    } catch (e) {
        res.status(500).json({message:'Internal server error!'})
    }
}


exports.allUser=(req,res,next)=>{
    User.find()
    .then(users=>{
       res.status(200).json(users)
    })
    .catch(error=>{
        res.status(500).json({message:'Internal server error!'})
    })
}