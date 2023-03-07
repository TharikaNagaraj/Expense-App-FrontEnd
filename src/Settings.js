import React,{useState,useEffect} from "react";
import ExpenseNavbar from "./ExpenseNavbar";
import settingscss from "./settings.module.css"
import axios from 'axios'
import swal from 'sweetalert2'
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import BudgetModal from "./BudgetModal";
import Swal from "sweetalert2";

const Settings = (props) => 
{
    const {deleteToken} = props
    // console.log(deleteToken)
    const [budget,setBudget] = useState("")
    const [categories,setCategories] = useState("")
    const [budgetData,setBudgetData] = useState({})
    const [categoryData,setCategoryData] = useState({})
    const [categoriesArr,setCategoriesArr] = useState([])
    const [categorySelect,setCategorySelect] = useState("")
    const [categoryDeleteId,setCategoryDeleteId] = useState("")
    const [budgetAmount,setbudgetAmount] = useState("")
    const [archiveToggle,setArchiveToggle] = useState(false)
    const [archivedBudgets,setArchivedBudgets] = useState([])
    const [archiveId,setArchiveId] = useState("")
    const [budgetInfo,setBudgetInfo] = useState([])
    const [budgetModalToggle,setBudgetModalToggle] = useState(false)
    const [archiveBudgetId,setArchiveBudgetId] = useState("")
    const[budgetDeleteId,setBudgetDeleteId] = useState("")

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/users/categories",{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((ele) => 
            {
                console.log('categoriesArr',ele.data)
                setCategoriesArr(ele.data)
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[])

    useEffect(() => 
    {
        if(categoryData.hasOwnProperty("name"))
        {
            axios.post("http://localhost:3050/api/users/category",categoryData,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((ele) => 
            {
                // console.log("categories",ele)
                if(ele.data == "Category already exists")
                {
                    swal.fire({
                        title : "Category already exists"
                    })
                }
                else
                {
                    const arr = [{...ele.data},...categoriesArr] 
                    console.log('category',arr)
                    setCategoriesArr(arr)
                }
                
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
        
    },[categoryData])

    useEffect(() => 
    {
        if(categoryDeleteId)
        {
            axios.delete(`http://localhost:3050/api/users/categories/${categoryDeleteId}`)
            .then((category) => 
            {
                console.log('category delete',category)
                if(category.data == "Category cannot be deleted")
                {
                    swal.fire({
                        title : "Category not deleted",
                        text : "There are active expenses associated with this category."
                    })
                }
                else
                {
                    const result = categoriesArr.filter((ele) => 
                    {
                        return(ele.name != category.data.name)
                    })
                    setCategoriesArr(result)
                    swal.fire({
                        title:`Category - ${category.data.name} deleted !`
                    })
                }               
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
    },[categoryDeleteId])

    useEffect(() => 
    {
        if(budgetData.hasOwnProperty("Amount"))
        {
            axios.post("http://localhost:3050/api/users/budget",budgetData,
            {
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((budget) => 
                {
                    // console.log('budget-settings',budget)
                    const result = budget.data
                    const arr = [{...result}]
                    setBudgetInfo(arr)
                    // console.log('result',arr)
                    setbudgetAmount(result.Amount)
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
    },[budgetData])

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/users/budget",{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((budget) => 
        {
            console.log('budget-settings-get',budget.data)
            const result = budget.data
            setBudgetInfo(result)
            // console.log('result',result)
            result.forEach((ele) => 
            {
                setbudgetAmount(ele.Amount)
            })           
        })
        .catch((err) => 
        {
            console.log(err)
        })
    },[])

    useEffect(() => 
    {
        if(archiveId)
        {
            axios.post(`http://localhost:3050/api/users/budget/archive/${archiveId}`)
                .then((ele) => 
                {
                    // console.log('archived budget',ele)
                    const result = ele.data
                    if(result.isArchived == true)
                    {
                        setBudgetInfo({})
                        setbudgetAmount("")
                    }
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }

    },[archiveId])

    useEffect(() => 
    {   
        if(archiveToggle)
        {
            axios.get("http://localhost:3050/api/users/budget/archived-budgets",{
                headers:{
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then((ele) => 
            {
                // console.log("Archived budgets",ele.data)
                setArchivedBudgets(ele.data)
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
    },[archiveToggle])

    useEffect(() => 
    {
        if(budgetDeleteId)
        {
            axios.delete(`http://localhost:3050/api/users/budget/${budgetDeleteId}`)
            .then((budget) => 
            {
                // console.log("deleted-budget",budget.data)
                if(budget.data._id === budgetDeleteId)
                {
                    Swal.fire({title:"Budget deleted !"})
                    const arr = [...archivedBudgets]
                    const result = arr.filter((ele) => 
                    {
                        return(ele._id != budget.data._id)
                    })
                    // console.log(result)
                    setArchivedBudgets(result)
                }
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
       
    },[budgetDeleteId])

    const handleInput = (e) => 
    {
        const result = e.target.value
        if(e.target.name == "budget")
        {
            // console.log(result)
            setBudget(result)
        }
        else 
        {
            // console.log(result)
            setCategories(result)
        }
    }
    const handleBudget = (e) => 
    {
        e.preventDefault()
        const budgetObj = {
            Amount : Number(budget)}
        setBudgetData(budgetObj)
        // console.log(budgetObj)
        // setBudget("")
    }
    const handleCategoryAdd  = (e) => 
    {
        let arr = ""
        arr = categories[0].toUpperCase()
        for(let i = 1 ; i < categories.length ; i++)
        { 
            arr = arr + categories[i]
        }
        // console.log(arr)
        const categoryObj = {
            name : arr
        }
        setCategoryData(categoryObj)
        setCategories("")
    }
    const handleSelect = (e) => 
    {
        const result = e.target.value
        setCategorySelect(result)
    }
    const handleCategoryDelete = (e) => 
    {
        const selectName = categorySelect
        const result = categoriesArr.find((ele) => 
        {
            return(ele.name == selectName)
        })
        // console.log('result',result)
        if(result)
        {
            setCategoryDeleteId(result._id)
        }       
    }
    const handleArchive = () => 
    {
        // console.log("budgetInfo",budgetInfo)
        Swal.fire({
            title:"Are you sure?",
            text:"Archiving a budget will also archive all the related expenses.Are you still sure?",
            showCancelButton:true,
            showConfirmButton:true,
            cancelButtonText:"No",
            confirmButtonText:"Yes",
            cancelButtonColor:"#1e90ff",
            confirmButtonColor:"#1e90ff" 
            }).then((result) => 
            {
                if(result.isConfirmed)
                {
                    const arr = [...budgetInfo]
                    // console.log("budgetArr",arr)
                    arr.forEach((ele) => 
                    {
                        setArchiveId(ele._id)
                    })
                }
            })
    }
    const handleArchivedBudgets = (e) => 
    {
        setArchiveToggle(!archiveToggle)
    }
    const handleBudgetModal = (e,id) => 
    {
        // console.log("archive-id",id)
        setArchiveBudgetId(id)
        setBudgetModalToggle(!budgetModalToggle)
    }
    const handleBudgetDelete = (e,id) => 
    {
        // console.log("budgetId",id)
        Swal.fire({
            title:"Are you sure ?",
            text:"Deleting a budget will also delete all it's expenses.None of the budget's data can be retrieved back! Are you still sure?",
            showCancelButton:true,
            showConfirmButton:true,
            cancelButtonText:"No",
            cancelButtonColor:"#1e90ff",
            confirmButtonColor:"#1e90ff",   
            confirmButtonText:"Yes"
        }).then((result) =>
        {
            if(result.isConfirmed)
            {
                setBudgetDeleteId(id)
            }
        })
        
    }

    return(
        <div>
            <ExpenseNavbar deleteToken={deleteToken}/>
            <form onSubmit={handleBudget} className={`row ${settingscss.budgetformStyle}`}>
                <label className={`col-md-2 ${settingscss.budgetlabelStyle}`}>Add budget :</label>
                <div className={`col-md-3 ${settingscss.budgettextStyle}`}><input type="text" name="budget" className="form-control" placeholder="Amount in rupees" value={(budget) ? (budget) : (budgetAmount)}  disabled={(budgetAmount) && (true)} onChange={handleInput}/></div>
                <div className={`col-md-2`}><input type="submit" value="Add" disabled={(budgetAmount) && true} className="btn btn-primary"/></div>
                <div className={`col-md-2 ${settingscss.cancelStyle}`}><button type="button" className="btn btn-primary" onClick={handleArchive}>Archive</button></div> 
                <div className={`col-md-2 ${settingscss.archiveStyle}`}><button type="button" className="btn btn-primary" onClick={handleArchivedBudgets}>Archived budgets</button></div>
            </form>
            <div className="row">
                <label className={`${settingscss.categorylabelStyle} col-md-2`}>Add categories :</label>
                <div className={`${settingscss.categorytextStyle} col-md-3`}><input type="text" name="categories" className="form-control" value={categories} onChange={handleInput}/></div>
                <div className={`col-md-2`}><button className="btn btn-primary" onClick={handleCategoryAdd}>Add</button></div>
            </div>     
            <div className={`row`}>
                <label className={`col-md-4 ${settingscss.catdelStyle}`}>Delete categories :</label>
                <div className={`col-md-3 ${settingscss.categoryselectStyle}`}>
                    <select name="categorySelect" value={categorySelect} onChange={handleSelect} className="form-select">
                        <option>select</option>
                        {categoriesArr.map((ele) => 
                        {
                            return (<option key={ele._id}>{ele.name}</option>)
                        })}
                    </select>
                </div>
                <div className={`col-md-2 ${settingscss.categorydeleteStyle}`}><button type="button" className="btn btn-primary" onClick={handleCategoryDelete}>Delete</button></div>
            </div> 
            <div className={`${settingscss.listStyle}`}>
                {(archiveToggle) && (
                    <div>
                    {/* <h4>Archived budgets - {archivedBudgets.length}</h4> */}
                    <Table bordered hover>
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Budget Amount</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {archivedBudgets.map((ele,i) => 
                            {
                                return(
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{ele.Amount}{"  "}
                                    <button className={`${settingscss.viewStyle} btn btn-primary`} onClick={(e) => {handleBudgetModal(e,ele._id)}}>View</button>
                                    </td>
                                    <td>{(ele.createdAt).split("T")[0]}
                                    <button className={`${settingscss.deleteStyle} btn btn-primary`} onClick={(e) => {handleBudgetDelete(e,ele._id)}}>Delete</button></td>
                                </tr>)
                            })}
                        </tbody>
                    </Table>
                    {(budgetModalToggle) && (<BudgetModal budgetModalToggle={budgetModalToggle} 
                        setBudgetModalToggle={setBudgetModalToggle} archiveBudgetId={archiveBudgetId}/>)}
                    </div>
                )}
            </div>                                        
        </div>
    )
}
export default Settings