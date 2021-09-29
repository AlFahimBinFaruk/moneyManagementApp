import React from 'react';
import {connect} from 'react-redux'
import {loadTransactions,removeTransaction} from '../store/actions/transactionAction'
import CreateTransaction from '../components/transaction/CreateTransaction'

import UpdateTransaction from '../components/transaction/UpdateTransaction';

class Dashboard extends React.Component{
    state={
        createModalOpen:false,
        updateModalOpen:false,
        id:''
    }

    openCreateModal=()=>{
        this.setState({
            createModalOpen:true
        })
    }
    closeCreateModal=()=>{
        this.setState({
            createModalOpen:false
        })
    }

    openUpdateModal=(id)=>{
        this.setState({
            updateModalOpen:true,
            id
        })
    }
    closeUpdateModal=()=>{
        this.setState({
            updateModalOpen:false,
            id:''
        })
    }


    componentDidMount(){
   this.props.loadTransactions()
    }

    render(){
        let {auth,transactions}=this.props
        console.log("transaction",transactions)
         return (
             <div className="row">
                 <div className="col-md-8 offset-md-2">
                     <h1>Welcome {auth.user.name}</h1>
                     <p>Your Email is {auth.user.email}</p>
                     <button
                     className="btn btn-primary"
                     onClick={this.openCreateModal}
                     >Create a new transaction.</button>
                     <CreateTransaction 
                     isOpen={this.state.createModalOpen}
                     close={this.closeCreateModal}
                     />
                     <br/>
                     <h1>Transactions</h1>
                     <ul className="list-group">
                         {
                             transactions.message?<p>{transactions.message}</p> :transactions.map(transaction=>(
                                 <li 
                                 key={transaction._id}
                                 className="list-group-item">
                                   <p>Type:{transaction.type}</p>
                                   <p>Amount:{transaction.balance}</p>
                                   <p>Note:{transaction.note}</p>
                                   {
                                       this.state.id===transaction._id ?
                                       <UpdateTransaction 
                                       isOpen={this.state.updateModalOpen}
                                       close={this.closeUpdateModal}
                                       transaction={transaction}
                                       />:null
                                   }
                                   <button className="btn btn-outline-danger "
                                   onClick={()=>this.props.removeTransaction(transaction._id)}
                                   >Delete</button>

                                   <button className="btn btn-outline-warning m-2"
                                   onClick={()=>this.openUpdateModal(transaction._id)}
                                   >Update</button>
                                 </li>
                             ))
                         }
                     </ul>
                 </div>
             </div>
         )
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
    transactions:state.transactions
})

export default connect(mapStateToProps,{loadTransactions,removeTransaction})(Dashboard)