import React,{useState,useEffect} from "react";
// import "./SignIn.css"
import signincss from "./SignIn.module.css"
import {Link} from 'react-router-dom'
import isEmail from '../node_modules/validator/lib/isEmail'
import axios from "axios"
import myImage from '../src/expense-app-image.jpg'
import Swal from "sweetalert2";
import { useDispatch,useSelector } from "react-redux";
import { startSignIn,startBudgetInfo } from "./actions/userActions";

const SignIn = (props) => 
{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errData,setErrData] = useState({})
    const [formData,setFormData] = useState({})
    const [token,setToken] = useState("")
    const errObj = {}
    const formObj = {}

    const {getToken} = props
    const dispatch = useDispatch()
    const userData = useSelector((state) => 
    {
        return (state.user)
    })
    
    console.log('redux-store',userData)

    useEffect(() => 
    {
        console.log(userData.length)
        if((userData == 'invalid email or password') || (userData == 'Invalid email or password'))
        {
            Swal.fire({
                 title:"Invalid email or password"
                })
        }
        else if(userData.length > 0)
        {
            const keys = Object.keys(userData[0])
            const values = Object.values(userData[0])
            console.log("keys",keys)
            console.log("values",values)
            if(keys.includes("token"))
            {
                const result = Object.values(userData)
                const tokenData = result[0]
                console.log("token-",tokenData)
                getToken(tokenData.token)
                setToken(tokenData.token)
            }
            else if(keys.length == 0) 
            {
                props.history.push("/settings")        
            }
            else
            {
                console.log("Budget-signIn",userData) 
                if(localStorage.getItem("token"))
                {
                    props.history.push("/dashboard")
                }
                else
                {
                    props.history.push("/")
                }
            }
        }
    },[userData])
   
    useEffect(() => 
    {   
        if(Object.keys(formData).length >0)
        { 
            const url = "http://localhost:3050/api/users/login"
            dispatch(startSignIn(url,formData))
        }
    },[formData])

    useEffect(() => 
    {
        if(token)
        {
            const url = "http://localhost:3050/api/users/budget"
            dispatch(startBudgetInfo(url))
        }   
    },[token])

    const handleInput = (e) => 
    {
        const input = e.target.value
        if(e.target.name == "email")
        {
            console.log(input)
            setEmail(input)
        }
        else
        {
            console.log(input)
            setPassword(input)
        }
    }
    const validations = () => 
    {
        if(!email)
        {
            errObj.email="Email cannot be blank"
        }
        else if(email)
        {
            if(!(isEmail(email)))
            {
                errObj.email="Email not valid"
            }
            else
            {
                formObj.email = email
            }
        }
        if(!password)
        {
            errObj.password = "Password cannot be blank"
        }
        else if(password)
        {
            formObj.password = password
        }

    }

    const handleSubmit = (e) =>
    {
        e.preventDefault()
        validations()
        if(Object.keys(errObj).length > 0)
        {
            setErrData(errObj)
            // console.log('errObj',errObj)
        }
        else
        {
            setFormData(formObj)
            // console.log('formObj',formObj)
            setEmail("")
            setPassword("")
            setErrData({})
        }
    }
    const handleCancel = () => 
    {
        setErrData({})
        setFormData({})
        setEmail("")
        setPassword("")
    }
    
    return(
        <div className={signincss.bgStyle}>
            <h1 className={signincss.titleStyle}>Expense Tracker</h1>
            <div className="row">
            <form onSubmit={handleSubmit} className={`${signincss.signinStyle} col-md-3`}>
                <h3>Sign In</h3>
                <input className={` form-control ${signincss.emailStyle}`} type="text" placeholder="Enter your email" name="email" value={email} onChange={handleInput}/>
                <span>{(Object.keys(errData).length >0) && (<div style={{color:"red"}}>{errData.email}</div>)}</span>
                <input className={`form-control ${signincss.pwdStyle}`} type="password" placeholder="Enter your password" name="password" value={password} onChange={handleInput}/>
                <span>{(Object.keys(errData).length >0) && (<div style={{color:"red"}}>{errData.password}</div>)}</span>
                <input className="btn btn-primary" type="submit"/>{"    "}
                <button type="button" className={`btn btn-primary ${signincss.submitStyle}`}onClick={handleCancel}>Cancel</button>
            </form>
            <div className={`${signincss.signupStyle}`}>New user?<Link to={"/signup"}>Sign up</Link></div> 
            </div>
                    
        </div>
    )
}
export default SignIn






// if(Object.keys(formData).length >0)
        // {
            // axios.post("http://localhost:3050/api/users/login",formData)
            //     .then((user) => 
            //     {
            //         console.log('userData',user)
            //         if(!(user.data.hasOwnProperty("token")))
            //         {
            //             Swal.fire({
            //                 title:"Invalid email or password"
            //             })
            //         }
            //         else
            //         {
            //             getToken(user.data.token)
            //             setToken(user.data.token)
            //         }
            //     })
            //     .catch((err) => 
            //     {
            //         console.log(err)
            //     })

            //code added for redux is shown below
            // const url = "http://localhost:3050/api/users/login"
            // dispatch(startSignIn(url,formData))
        // }

// if(token)
//         {
            // axios.get("http://localhost:3050/api/users/budget",{
            //     headers:{
            //         "Authorization":`Bearer ${localStorage.getItem('token')}`
            //     }
            //     })
            //     .then((ele) => 
            //     {
            //         console.log("Budget-signIn",ele.data)     
            //         const data = ele.data
            //         if(ele.data.length == 0)
            //         {
            //             props.history.push("/settings")
            //         }  
            //         else
            //         {
            //             props.history.push("/dashboard")
            //         }
            //     })
            //     .catch((err) => 
            //     {
            //         console.log(err)
            //     })

            //code added for redux is shown below
            // const url = "http://localhost:3050/api/users/budget"
            // dispatch(startBudgetInfo(url))
        // }   