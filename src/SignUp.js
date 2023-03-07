import React,{useState,useEffect} from 'react'
// import "../src/signup.css"
import signupcss from "../src/signup.module.css"
import isEmail from "../node_modules/validator/lib/isEmail"
import axios from 'axios'
import swal from 'sweetalert2'
import { useSelector,useDispatch } from 'react-redux'
import {startUserRegister} from './actions/userActions'


const SignUp = (props) => 
{
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [errData,setErrData] = useState({})
    const [formData,setFormData] = useState({})
    let formObj = {}
    let errObj = {}
    const dispatch = useDispatch()
    const userData = useSelector((state) => 
    {
        return state.user
    })
    useEffect(() => 
    {
        console.log('userData',userData)
        if(userData.length > 0)
        {
            const keys = Object.keys(userData[0])
            const values = Object.values(userData[0])
            console.log('keys',keys)
            if((keys.includes("index")) || (keys.includes("code")) || (keys.includes("keyPattern")) || (keys.includes("keyValue")))
            {
                swal.fire({
                    title:"Account already exists!",
                    text:"Login with your email and password"
                })
                props.history.push("/")
            }
            else
            {
                swal.fire({
                    icon :'success',
                    title :'Account creation successful',
                    text : 'You are now redirected to the login page'
                })
                props.history.push("/")
            }
        }
        
    },[userData])
    useEffect(() => 
    {
        if(Object.keys(formData).length >0)
        {
            const url = "http://localhost:3050/api/users/register"
            dispatch(startUserRegister(url,formData))
        }
    },[formData])

    const handleInput = (e) => 
    {
        const input = e.target.value
        if(e.target.name == 'name')
        {
            // console.log(input)
            setName(input)
        }
        else if(e.target.name == 'email')
        {
            // console.log(input)
            setEmail(input)
        }
        else
        {
            // console.log(input)
            setPassword(input)
        }
    }

    const validations = () => 
    {
        if(!name)
        {
            errObj.name = "Name cannot be blank"
        }
        else
        {
            formObj.name = name
        }
        if(!email)
        {
            errObj.email = "Email cannot be blank"
        }
        else
        {
            if(!(isEmail(email)))
            {
                errObj.email = "Invalid emailid"
            }
            else
            {
                formObj.email = email
            }
        }
        if(!password)
        {
            errObj.password = "password cannot be blank"
        }
        else
        {
            if(!((password.length >=8) && (password.length<= 128)))
            {
                errObj.password = "Password length should be between 8 and 128 characters"
            }
            else
            {
                formObj.password = password
            }
        }
    }
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        validations()
        if(Object.keys(errObj).length > 0)
        {
            setErrData(errObj)
        }
        else
        {
            setFormData(formObj)
            setErrData({})
            setName("")
            setPassword("")
            setEmail("")
            console.log(formObj)
        }

    }
    const handleBack = () => 
    {
        props.history.push("/")
    }
    const handleCancel = () => 
    {
        setErrData({})
        setFormData({})
        setName("")
        setPassword("")
        setEmail("")
    }

    return(
        <div className={signupcss.bgStyle} >
             <div className={signupcss.labelStyle}>
                <h2>Create your account</h2>
            </div>
            <div className='row'>
                <form className={`col-md-5 `} onSubmit={handleSubmit}>
                    <div className={`${signupcss.nameStyle}`}>
                    <label>Name</label><input type="text" className="form-control" placeholder='Your name' name="name" value={name} onChange={handleInput}/>
                    <span style={{color:"red"}}>{(Object.keys(errData).length >0) && (errData.name)}</span>
                    </div>
                    <div className={`${signupcss.emailStyle}`}>
                    <label>Email</label><input type="text" className="form-control" placeholder="Your email" name='email'  value={email} onChange={handleInput}/>
                    <span style={{color:"red"}}>{(Object.keys(errData).length >0) && (errData.email)}</span>
                    </div>
                    <div className={`${signupcss.pwdStyle}`}>
                    <label>Password</label><input type="password" className="form-control" placeholder="Between 8 and 128 characters" name="password" value={password} onChange={handleInput}/>
                    <span style={{color:"red"}}>{(Object.keys(errData).length >0) && (errData.password)}</span>
                    </div>
                    <div className={signupcss.buttonStyle}>
                    <input type="submit" value="Register" className='btn btn-primary'/>{"   "}
                    <button type="button" className='btn btn-primary' onClick={handleCancel}>Cancel</button>{" "}
                    <button type='button' className='btn btn-primary' onClick={handleBack}>Back</button>
                    </div>

                </form>  
            </div>
                
        </div>
    )
}
export default SignUp






















// if(Object.keys(formData).length >0)
//         {
//             const url = "http://localhost:3050/api/users/register"
//             dispatch(startUserRegister(url,formData))
            // axios.post("http://localhost:3050/api/users/register",formData)
            //     .then((user) =>
            //     {
            //         console.log('user',user)
            //         const result = user.data
            //         if(result.hasOwnProperty("_id"))
            //         {
            //             swal.fire({
            //                 icon :'success',
            //                 title :'Account creation successful',
            //                 text : 'You are now redirected to the login page'
            //             })
            //             props.history.push("/")
            //         }
            //         else if(result.keyValue.email == formData.email)
            //         {
            //             // alert("Account already exists! Login with your email and password")
            //             swal.fire(
            //                 'Account already exists!',
            //                 "Login with your email and password"
            //             )
            //             props.history.push("/")
            //         }
                    
            //     })
            //     .catch((err) => 
            //     {
            //         console.log(err)
            //     })
        // }