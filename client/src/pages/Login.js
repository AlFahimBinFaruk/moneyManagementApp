import React from "react";
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {login} from '../store/actions/authAction'
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
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

    changeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        let {email,password}=this.state
        this.props.login({email,password},this.props.history)
    }

    render(){
        let {email,password,error}=this.state
        return (
            <div className="row my-5">
            <h1 className="text-center mb-3">Login Here!</h1>
            <div className="col-md-6 offset-md-3 card p-3">
            <form onSubmit={this.submitHandler}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" name="email" value={email} onChange={this.changeHandler} className={error.email ? "form-control is-invalid" :"form-control"} id="exampleInputEmail1"/>
                    {error.email && <div className="invalid-feedback">{error.email}</div>}
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name="password" value={password} onChange={this.changeHandler} className={error.password ? "form-control is-invalid" :"form-control"} id="exampleInputPassword1"/>
                    {error.password && <div className="invalid-feedback">{error.password}</div>}
                </div>
                
                {error.message && 
                <>
                <br/>
                <div className="text-danger">{error.message}</div>
                <br/>
                </>
                }
                
                <Link to='/register'>Don't Have An Account?Register.</Link>
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

export default withRouter(connect(mapStateToProps,{login})(Login))

