import React, { useState,useEffect } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import {Link,Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Profile from './Profile'
import EditUser from './EditUser'
import { withRouter } from 'react-router-dom'



const ExpenseContainer = (props) => 
{
    const [token,setToken] = useState("")
    useEffect(() => 
    {
        const result = localStorage.getItem("token")
        setToken(result)
    },[])
    const getToken = (ele) => 
    {
        // setToken(ele)
        console.log('token in container',ele)
        const tokenWithoutBearer = ele.split(" ")[1]
        console.log('token without bearer',tokenWithoutBearer)
        localStorage.setItem("token",tokenWithoutBearer)
        setToken(tokenWithoutBearer)        
    }
    const deleteToken = () => 
    {
        localStorage.removeItem("token")
        setToken("")
        props.history.push("/")
    }
    return(
        <div>
            {(token) && (
            <div>
                <Route path={"/dashboard"} render={(props) => 
                {
                    return <Dashboard
                    deleteToken={deleteToken}
                    exact={true}
                    />
                }}/>
                <Route path={"/settings"} render={(props) => 
                {
                    return <Settings
                    {...props}
                    deleteToken={deleteToken}
                    />
                }}/>
                <Route path={"/profile"} render={(props) => 
                {
                    return (<Profile
                    {...props}
                    deleteToken={deleteToken}/>)
                }}/>
                {/* <Route path={"/editprofile/:data"} render={(props) => 
                {
                    return (<EditUser
                    {...props}
                    deleteToken={deleteToken}/>)
                }}/> */}
            </div>
            )}
         
            <Route path={"/"} render={(props) =>
            {
                return <SignIn
                {...props}
                getToken = {getToken}
                exact = {true}
                />
            }} exact={true}/>
            <Route path={"/signup"} component={SignUp}/>
        </div>
    )
}
export default withRouter(ExpenseContainer) 