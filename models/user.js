const {Schema,model}=require('mongoose')

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    balance:Number,
    income:Number,
    expense:Number,
    transaction:[{
        type:Schema.Types.ObjectId,
        ref:"Transaction"
    }]
})

const User=model("User",UserSchema)
module.exports=User