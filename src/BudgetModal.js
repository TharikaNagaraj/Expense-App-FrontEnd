import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Button, Modal,Table } from 'react-bootstrap'
import budgetModalcss from "./BudgetModal.js"
import Swal from 'sweetalert2'

const BudgetModal = (props) => 
{
    const {budgetModalToggle,setBudgetModalToggle,archiveBudgetId} = props
    const [archivedExpenses,setArchivedExpenses] = useState([])
    const [expenseDeleteId,setExpenseDeleteId] = useState("")

    useEffect(() => 
    {
        axios.get(`http://localhost:3050/api/users/archived-expense/${archiveBudgetId}`)
            .then((ele) => 
            {
                console.log('archived-expenses',ele.data)
                setArchivedExpenses(ele.data)
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[],[archiveBudgetId])

    useEffect(() => 
    {
        if(expenseDeleteId)
        {
            axios.delete(`http://localhost:3050/api/users/archived-expense/${expenseDeleteId}`)
            .then((expense) => 
            {
                console.log("deleted-expense-from-archive",expense.data)
                const arr = [...archivedExpenses]
                const result = arr.filter((ele) => 
                {
                    return((ele._id != expense.data._id))
                })
                console.log(result)
                setArchivedExpenses(result)
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }        
    },[expenseDeleteId])

    const handleClose = () => 
    {
        setBudgetModalToggle(!budgetModalToggle)
    }

    const handleExpenseDelete = (e,id) => 
    {
        Swal.fire({
            title:"Are you sure ?",
            text:"Expenses deleted cannot be retrieved back.",
        })
        setExpenseDeleteId(id)
    }

    return(
    <div>
        <Modal show={budgetModalToggle} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Expenses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Category</th>
                            <th>Item</th>
                            <th>Amount</th>
                            <th>Expense Date</th>
                        </tr>
                        {archivedExpenses.map((ele,i) => 
                        {
                            return(
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{ele.category}</td>
                                <td>{ele.item}</td>
                                <td>{ele.amount}</td>
                                <td>{(ele.expenseDate).split("T")[0]}{" "}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style={{"fill":"#8b0000"}} cursor="pointer" pointerEvents="bounding-box" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                onClick={(e) => {handleExpenseDelete(e,ele._id)}}/>
                                </svg>
                                </td>
                                
                            </tr>)
                        })}
                    </thead>
                </Table>
            </Modal.Body>
        </Modal>
    </div>)
}
export default BudgetModal