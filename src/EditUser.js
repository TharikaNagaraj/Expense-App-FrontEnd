import React,{useState,useEffect} from 'react'
import ExpenseNavbar from './ExpenseNavbar'
import axios from 'axios'
import editusercss from "./edituser.module.css"
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'


const EditUser = (props) => 
{
    const {deleteToken,editToggle} = props
    const {formData} = props
    // console.log(formData)
    const [name,setName] = useState((!(formData.hasOwnProperty("name"))) ? " " : (formData.name))
    const [occupation,setOccupation] = useState((!(formData.hasOwnProperty("occupation"))) ? "" : (formData.occupation))
    const [photo,setPhoto] = useState((!(formData.hasOwnProperty("filePath"))) ? "" : (formData.filePath))
    const [editFormData,setEditFormData] = useState({})

    useEffect(() => 
    {
        if(Object.keys(editFormData).length > 0)
        {
            axios.post("http://localhost:3050/api/users/account/profile",editFormData,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`,
                    "content-Type":"multipart/form-data"
                }
            })
            .then((user) => 
            {
                Swal.fire({
                    title:"Profile updated successfully",
                })
                console.log(user.data)
                editToggle()
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
    },[editFormData])

    const handleInput = (e) => 
    {
        const result = e.target.value
        if(e.target.name == "userName")
        {
            // console.log(result)
            setName(result)
        }
        else if(e.target.name == "userOccupation")
        {
            // console.log(result)
            setOccupation(result)
        }
        else if(e.target.name == "photo")
        {
            setPhoto(e.target.files[0])
            console.log(e.target.files) 
        }
    }
    
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        const editObj = {
            name,
            occupation,
            photo
        }
        setEditFormData(editObj)
        console.log(editObj)
    }
    const handleBack = (e) => 
    {
        editToggle()
    }
    const handleCancel = (e) => 
    {
        setEditFormData({})
        setName("")
        setOccupation("")
    }
    return(
        <div>
            <ExpenseNavbar deleteToken={deleteToken}/>
            <h1 className={editusercss.labelStyle}>Edit User details</h1><br />
            <form onSubmit={handleSubmit}>
                <div className={`${editusercss.nameStyle}`}>
                <label><h3>Name</h3></label>
                <input type="text" name='userName' className="form-control" value={name} onChange={handleInput} /><br />
                </div>
                <div className={`${editusercss.occupationStyle}`}>
                <label><h3>Occupation</h3></label>
                <input type="text" name='userOccupation' className="form-control" value={occupation} onChange={handleInput}/>
                </div><br />
                <div className={`${editusercss.photoStyle}`}>
                <label><h3>Photo</h3></label>
                <input type="file" className='form-control' name="photo" onChange={handleInput}/>
                </div><br />
                <div className={editusercss.buttonStyle}>
                <input type="submit" value="Save" className='btn btn-primary'/>{"   "}<button type='button' className='btn btn-primary' onClick={handleCancel}>Cancel</button>{" "}
                <button type='button' onClick={handleBack} className="btn btn-primary">Go back</button>
                </div>               
            </form>
        </div>
    )
}
export default withRouter(EditUser)