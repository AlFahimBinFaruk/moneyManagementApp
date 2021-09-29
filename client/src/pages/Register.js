import React from "react";
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {register} from '../store/actions/authAction'
import { withRouter } from "react-router-dom";


class Register extends React.Component{
   
   state={
       name:'',
       email:'',
       password:'',
       confirmPassword:'',
       error:{}
   }

   //to access the things that reducer will return
    static getDerivedStateFromProps(nextProps,prevState){
        if(JSON.stringify(nextProps.auth.error) !==JSON.stringify(prevState.error)){
            return{
                error:nextProps.auth.error
            }
        }
        return null
    }

   changeHandler=event=>{
       this.setState({
           [event.target.name]:event.target.value
       })
   }

   submitHandler=event=>{
   
    event.preventDefault();
    let {name,email,password,confirmPassword}=this.state
    this.props.register({name,email,password,confirmPassword},this.props.history)
   }

   render(){
       let {name,email,password,confirmPassword,error}=this.state
       return (
        <div className="row my-5">
            <h1 className="text-center mb-3">Register Here!</h1>
            <div className="col-md-6 offset-md-3 card p-3">
            <form onSubmit={this.submitHandler}>
            <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Name:</label>
                    <input 
                    type="text" 
                    placeholder="Enter Your Name."
                    name="name" 
                    value={name} 
                    onChange={this.changeHandler} className={error.name ? "form-control is-invalid" :"form-control"} 
                    id="name"/>
                    {error.name && <div className="invalid-feedback">{error.name}</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input 
                    type="email" 
                    placeholder="Enter Your Email."
                    name="email" 
                    value={email}
                    onChange={this.changeHandler} 
                    className={error.email ? "form-control is-invalid" :"form-control"}
                    id="exampleInputEmail1"/>
                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input 
                    type="password" 
                    placeholder="Enter Your Password."
                    name="password" 
                    value={password} 
                    onChange={this.changeHandler} 
                    className={error.password ? "form-control is-invalid" :"form-control"} 
                    id="exampleInputPassword1"/>
                    {error.password && <div className="invalid-feedback">{error.password}</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input 
                    type="password" 
                    placeholder="Confirm Your Password."
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={this.changeHandler} 
                    className={error.confirmPassword ? "form-control is-invalid" :"form-control"}
                    id="exampleInputPassword2"/>
                    {error.confirmPassword && <div className="invalid-feedback">{error.confirmPassword}</div>}
                </div>
                <Link to='/login'>Already Have An Account?Login.</Link>
                <button type="submit" className="btn btn-primary d-block my-2">Submit</button>
            </form>
            </div>
        </div>
       )
   }
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default withRouter(connect(mapStateToProps,{register})(Register))