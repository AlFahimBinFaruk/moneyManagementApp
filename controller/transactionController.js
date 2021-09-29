const Transaction=require('../models/transaction')
const User=require('../models/user')

exports.create=(req,res)=>{
      let {balance,type,note}=req.body
      let userId=req.user._id

      let transaction=new Transaction({
          balance,type,note,author:userId
      })

      transaction.save()
      .then(transaction=>{
          let updatedUser={...req.user._doc}
          if(type=='income'){
           updatedUser.balance=updatedUser.balance+balance;
           updatedUser.income=updatedUser.income+balance;

          }else if(type=='expense'){
            updatedUser.balance=updatedUser.balance-balance;
            updatedUser.expense=updatedUser.expense+balance;
          }

          updatedUser.transaction.unshift(transaction._id)
          User.findByIdAndUpdate(userId,{$set:updatedUser},{new:true})
          .then(result=>{
            res.status(200).json({
                message:'Transaction created successfully In User',
                ...transaction._doc,
                user:result
            })
          })
          .catch(error=>{
            console.log(error)
            res.status(500).json({message:"internal server error 1st",updatedUser})
          })


        
      })
      .catch(error=>{
          console.log("error",error)
          res.status(500).json({message:"internal server error 2nd"})
      })
}


exports.getAll=(req,res)=>{
    let {_id} =req.user
    Transaction.find({author:_id})
    .then(transaction=>{
        if(transaction.length==0){
            res.status(200).json({
                message:"No transaction found!"
            })
        }else{
            res.status(200).json(transaction)
        }
    })
    .catch(error=>{
        res.status(500).json({message:"internal server error"})
    })
}

exports.getSingleTransaction=(req,res)=>{
    let {transactionId}=req.params

    Transaction.findById(transactionId)
    .then(transaction=>{
        if(transaction.length==0){
            res.status(200).json({
                message:"No transaction found!"
            })
        }else{
            res.status(200).json(transaction)
        }
    })
    .catch(error=>{
        res.status(500).json({message:"internal server error"})
    })
}

exports.update=(req,res)=>{
    let {transactionId}=req.params
    Transaction.findByIdAndUpdate(transactionId,{$set:req.body},{new:true})
    .then(result=>{
        res.status(200).json({
            message:"updated successfully",
            transactions:result
        })
    })
    .catch(error=>{
        res.status(500).json({message:"internal server error"})
    })
}

exports.remove=(req,res)=>{
    let {transactionId}=req.params
    Transaction.findByIdAndDelete(transactionId)
    .then(result=>{
        res.status(200).json({
            message:"deletd successfully",
            ...result._doc
        })
    })
    .catch(error=>{
        res.status(500).json({message:"internal server error"})
    })
}