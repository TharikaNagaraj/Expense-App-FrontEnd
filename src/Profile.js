import axios from 'axios'
import React,{useState,useEffect} from 'react'
import ExpenseNavbar from './ExpenseNavbar'
import profilecss from "./profile.module.css"
import EditUser from './EditUser'
import swal from 'sweetalert2'

const Profile = (props) => 
{
    const [name,setName] = useState("")
    const [occupation,setOccupation] = useState("")
    const [filePath,setFilePath] = useState("")
    const {deleteToken} = props
    const [toggle,setToggle] = useState(false)
    const [formData,setFormData] = useState({})

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/users/account/profile",{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((user) => 
        {
            console.log('user',user)
            setName(user.data.name)
            setOccupation(user.data.occupation)
            setFilePath(user.data.photo)
        })
        .catch((err) => 
        {
            console.log(err)
        })

    },[toggle])
    const editToggle = () => 
    {
        setToggle(!toggle)
    }

    const handleEdit = (e) => 
    {
        swal.fire({
            title:"Do you want to edit your personal information ?",
            showDenyButton:true,
            showConfirmButton:true,
            confirmButtonText:"yes",
            denyButtonText:"cancel",
        })
        .then((result) => 
        {
            if(result.isConfirmed)
            {
                const obj = {
                    name : name,
                    occupation : ((occupation) ? (occupation) : ("")),
                    filePath : ((filePath) ? (filePath) : (""))
                }
                setFormData(obj)
                editToggle()
                // console.log('obj',obj)
            }
        })
    }
    return(
        <div>
            {(toggle) ? (<EditUser formData={formData} deleteToken={deleteToken} editToggle={editToggle}/>) : (
                <div>
                    <ExpenseNavbar deleteToken={deleteToken}/>
                    <div className='row mt-5'>
                            <div className = {`${profilecss.nameStyle} col-md-4` }>NAME - {name}{" "}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" cursor="pointer" pointerEvents="bounding-box" className="bi bi-pen" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                            onClick={handleEdit}/>
                            </svg><br /></div>
                            <div className={`col-md-3`}><img src={filePath} alt="photo" className={profilecss.photoStyle}/></div>
                            <div className = {`${profilecss.occupationStyle} col-md-6`}>OCCUPATION - {occupation}</div>
                    </div>                   
                </div>               
            )}            
        </div>
    )
}
export default Profile