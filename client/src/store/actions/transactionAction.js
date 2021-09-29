import axios from 'axios'
import * as Types from './types'




export const loadTransactions= () => dispatch => {
    axios.get('/transactions')
    .then(res=>{
        console.log('res is',res.data)
        dispatch({
            type:Types.LOAD_TRANSACTIONS,
            payload:{
                transactions:res.data
            }
        })
    })
    .catch(error=>{
        console.log(error)
    })
}

export const addNewTransaction=transaction=>dispatch=>{
    axios.post('/transactions/',transaction)
    .then(res=>{
        dispatch({
            type:Types.CREATE_TRANSACTION,
            payload:{
                transactions:res.data
            }
        })
    })
    .catch(error=>{
        console.log(error)
    })
}



export const removeTransaction=id=>dispatch=>{
    axios.delete(`/transactions/${id}`)
    .then(res=>{
        dispatch({
            type:Types.REMOVE_TRANSACTION,
            payload:{
                id:res.data._id
            }
        })
    })
    .catch(error=>{
        console.log(error)
    })
}


export const updateTransaction=(id,transaction)=>dispatch=>{
    axios.put(`/transactions/${id}`,transaction)
    .then(res=>{
        dispatch({
            type:Types.UPDATE_TRANSACTION,
            payload:{
                transactions:res.data.transactions
            }
        })
    })
    .catch(error=>{
        console.log(error)
    })
}