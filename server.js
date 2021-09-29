require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors=require('cors')
const passport=require('passport')
const path=require('path')
const app = express()

//routers

const authRouter=require('./router/authRouter')
const tranRouter=require('./router/transactionRouter')

const middleware = [
    morgan('dev'),
    cors(),
    express.urlencoded({
        extended: true
    }),
    express.json(),
    passport.initialize()
]

app.use(middleware)
//for authentication..
require('./password')(passport)

app.use('/auth',authRouter)
app.use('/transactions',tranRouter)

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.get('/', (req, res, next) => {
    res.send("welcome to out application")
})

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.DB_ACC, {
    useNewUrlParser: true
}).then(() => {
    app.listen(PORT, () => {
        console.log("server is running ",PORT)
    })
}).catch((err) => {
    console.log(err)
})