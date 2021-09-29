import Axios from 'axios'
import * as Types from './types'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'

export const register = (user, history) => dispatch => {
    Axios.post('/auth/register', user)
        .then((res) => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const login =(user,history)=>dispatch=>{
    Axios.post('/auth/login',user)
    .then(res=>{
        let token=res.data.token
        localStorage.setItem("auth_token",token)
        setAuthToken(token)
        let decode=jwtDecode(token)
        dispatch({
            type:Types.SET_USER,
            payload:{
                error:{},
                user:decode
            }
        })
        history.push('/')
    })
    .catch(error=>{
       
        dispatch({
            type:Types.USERS_ERROR,
            payload:{
                error:error.response.data
            }
        })
    })
    
}

export const logout=history=>{
    localStorage.removeItem("auth_token")
    history.push('/login')
    return{
        type:Types.SET_USER,
        payload:{
            error:{},
            user:{}
        }
    }
}