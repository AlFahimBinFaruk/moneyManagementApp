import React from "react";
import Modal from  'react-modal'
import { connect } from "react-redux";
import {addNewTransaction} from '../../store/actions/transactionAction'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '25rem'
    }
  };



class CreateTransaction extends React.Component{
    state={
        balance:0,
        type:'',
        note:''
    }

    changeHandler=(event)=>{
       this.setState({
           [event.target.name]:event.target.value
       })
    }
    
    submitHandler=(event)=>{
        event.preventDefault()
        this.props.addNewTransaction(this.state)
        this.setState({
            balance:0,
            type:'',
            note:''
        })
    }

    render(){
        let {balance,note}=this.state
        console.log(balance)
        return (
            <Modal
            isOpen={this.props.isOpen}
            onRequestClose={this.props.close}
            style={customStyles}
            contentLabel="Example Modal"
            >
               <form onSubmit={this.submitHandler}>
                   <h2>Create A Transaction.</h2>
                   <div className="form-group my-2">
                       <label className="form-label" htmlFor="balance">Balance:</label>
                        <input 
                        type="number"
                        className="form-control"
                        name="balance"
                        placeholder="Enter Total Balance."
                        id="balance"
                        value={balance}
                        onChange={this.changeHandler}
                        />
                   </div>

                   <div className="form-group my-2">
                       <label className="form-label" htmlFor="type">Type:</label>
                       <select className="form-control" onChange={this.changeHandler} name="type">
                           <option>Select a type</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                       </select>
                   </div>

                   <div className="form-group my-2">
                       <label className="form-label" htmlFor="note">Note:</label>
                       <textarea
                       className="form-control"
                       placeholder="Enter a note"
                       name="note"
                       id="note"
                       value={note}
                       onChange={this.changeHandler}
                       />
                   </div>
                   <button className="btn btn-primary">Submit.</button>
               </form>
            </Modal>
        )
    }
}

export default connect(null,{addNewTransaction})(CreateTransaction)