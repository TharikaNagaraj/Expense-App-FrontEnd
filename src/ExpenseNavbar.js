import React from 'react'
import "../src/navbar.css"
import {Nav,Navbar} from 'react-bootstrap'
import logo from "../src/expense-logo.png"
import { withRouter } from 'react-router-dom'

const ExpenseNavbar = (props) => 
{
    const {deleteToken} = props
    // console.log(deleteToken)
    const style = {
        color:"darkgreen",
        fontSize:"larger",
        fontWeight:600
    }
    const handleDashboard = () => 
    {
        props.history.push("/dashboard")
    }
    const handleSettings = () => 
    {
        props.history.push("/settings")
    }
    const handleProfile = () => 
    {
        props.history.push("/profile")
    }
    const handleLogout = () => 
    {
        deleteToken()
        // props.history.push("/")
    }
    const handleLogo = () => 
    {
        props.history.push("/dashboard")
    }
    return(
        <div>
           <Navbar bg="bgStyle" variant='dark' sticky='top'>
            <Navbar.Brand>
                <img src={logo} width="45px" height="45px" className='imgStyle' onClick={handleLogo}/>
            </Navbar.Brand>
           
           <Nav>
                <Nav.Link className="dashboardStyle" style={style} onClick={handleDashboard}>DASHBOARD</Nav.Link>
                <Nav.Link className='settingsStyle' style={style} onClick={handleSettings}>SETTINGS</Nav.Link>
                <Nav.Link className='profileStyle' style={style} onClick={handleProfile}>PROFILE</Nav.Link>
                <Nav.Link className='logoutStyle' style={style} onClick={handleLogout}>LOGOUT</Nav.Link>
           </Nav>
           </Navbar>
        </div>
    )
}
export default withRouter(ExpenseNavbar)