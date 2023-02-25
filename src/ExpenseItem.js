import React, { useState,useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import expenseitemcss from "./expenseitem.module.css"
import axios from 'axios'
import swal from "sweetalert2"
import ExpenseModal from './ExpenseModal'
import ExpensePagination from './ExpensePagination'

const ExpenseItem = (props) => 
{
    const {expenses,deleteExpense,categories,updateExpense,budgetId} = props
    const [expenseDeleteId,setExpenseDeleteId] = useState("")
    const [editToggle,setEditToggle] = useState(false)
    const [editId,setEditId] = useState("")
    const [editData,setEditData] = useState({})
    const [currentPage,setCurrentPage] = useState(1)
    const [dataPerPage,setDataPerPage] = useState(5)
    const [paginationArr,setPaginationArr] = useState([])
    const [maxPageLimit,setMaxPageLimit] = useState("")
    const [minPageLimit,setMinPageLimit] = useState("")
 
    useEffect(() => 
    {
        const totalPages = Math.ceil(expenses.length/dataPerPage)
        console.log('el',expenses.length)
        let arr = []
        for(let i=0 ; i<totalPages; i++)
        {
            arr.push(i+1)    
        }
        console.log('arr',arr)
        setPaginationArr(arr) 
        const min = (Number(dataPerPage)*(Number(currentPage)-1))+1 
        const max = Number(dataPerPage)*Number(currentPage)
        console.log("min",min)
        console.log("max",max)
        setMinPageLimit(min)
        setMaxPageLimit(max)
    },[currentPage,expenses])

    useEffect(() => 
    {
        if(expenseDeleteId)
        {
            axios.delete(`http://localhost:3050/api/users/expense/${expenseDeleteId}`)
                .then((expense) => 
                {
                    // console.log('deleted expense',expense)
                    if(expense.data.isDeleted == true)
                    {
                        deleteExpense(expense.data)
                    }
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
    },[expenseDeleteId])

    useEffect(() => 
    {
        if(editId)
        {
            axios.get(`http://localhost:3050/api/users/expense/${editId}`)
                .then((ele) => 
                {
                    // console.log('expenses-item',ele.data)
                    const result = ele.data
                    setEditData(result)
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
    },[editId])

    const handleDelete = (id) => 
    {
        swal.fire({
            title:"Are you sure you want to delete the expense?",
            showConfirmButton : true,
            showCancelButton:true,
            confirmButtonText:"yes",
            cancelButtonText:"no"
        }).then((result) =>
        {
            if(result.isConfirmed)
            {
                setExpenseDeleteId(id)
                swal.fire("expense deleted !")
            }
        })
    }
    const toggle = () => 
    {
        setEditToggle(!editToggle)
    }

    const handleEdit = (id) => 
    {
        setEditId(id)
        swal.fire({
            title:"Do you want to edit the data?",
            showConfirmButton:true,
            showCancelButton:true,
            confirmButtonText:"yes",
            cancelButtonText:"no"
        })
        .then((result) => 
        {
            if(result.isConfirmed)
            {
                toggle()
            }
        })
        
        // console.log("editid",id)
    }

    return(
        <div className={expenseitemcss.tableStyle}>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Category</th>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Expense Date</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((ele,i) => 
                    {
                    return(((i>=minPageLimit-1) && (i<=maxPageLimit-1)) && (
                    <tr key={i}>
                        <td>{i+1}</td>
                        <td>{ele.category}</td>
                        <td>{ele.item}</td>
                        <td>{ele.amount}</td>   
                        <td>{ele.expenseDate.split("T")[0]}{" "}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fillRule="currentColor" cursor="pointer" pointerEvents="bounding-box" className="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                        onClick={(e) => {handleEdit(ele._id)}}/>
                        </svg>{"    "} 
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor" cursor="pointer" pointerEvents="bounding-box" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        onClick={(e) => {handleDelete(ele._id)}}/>
                        </svg>  
                        </td>
                    </tr>)                      
                    )})}
                </tbody>
            </Table>
            <ExpensePagination currentPage={currentPage} setCurrentPage={setCurrentPage} paginationArr={paginationArr}/>
            {(editToggle) && (<ExpenseModal 
                                modalHeader = "Edit expense" editData={editData} editToggle={editToggle} categories={categories}
                                toggle={toggle} updateExpense={updateExpense}  budgetId={budgetId}/>)}
        </div>
    )
}
export default ExpenseItem