import React,{useState,useEffect} from 'react'
import {Modal,Button, Form} from "react-bootstrap"
import axios from 'axios'

const ExpenseModal = (props) => 
{
    const {toggle,expenseToggle,categories,postExpense,modalHeader,budgetId} = props
    const {editData,editToggle} = props
    const {updateExpense} = props
    // console.log("update expense",updateExpense)
    // console.log('expenseDate',editData.expenseDate.split("T")[0])
    // console.log('editData',editData)
    const [categoryId,setCategoryId] = useState("")
    const [show,setShow] = useState((expenseToggle) ? (expenseToggle) : ((editToggle) ? (editToggle) : (false)))
    const [category,setCategory] = useState((editToggle) ? (editData.category) : "")
    const [item,setItem] = useState((editToggle) ? (editData.item) : "")
    const [amount,setAmount] = useState((editToggle) ? (editData.amount) : "")
    const [date,setDate] = useState((editToggle) ? (editData.expenseDate.split("T")[0]) : "")
    const [errData,setErrData] = useState({})
    const [formData,setFormData] = useState({})
    const [editFormData,setEditFormData] = useState({})
    const errObj = {}
    const formObj = {}
   
    useEffect(() => 
    {
        if(Object.keys(formData).length >0)
        {
            axios.post(`http://localhost:3050/api/users/expense`,formData,{
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
                .then((expense) => 
                {
                    // console.log("expense",expense.data)
                    const result = expense.data
                    postExpense(result)
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
        
    },[formData])

    useEffect(() => 
    {
        if(Object.keys(editFormData).length >0)
        {
            axios.post(`http://localhost:3050/api/users/expense/${editData._id}`,editFormData)
                .then((expense) => 
                {
                    // console.log("edited-expense",expense.data)
                    updateExpense(expense.data)
                })
                .catch((err) => 
                {
                    console.log(err)
                })
        }
    },[editFormData])

    const handleClose = () => 
    {
        toggle()   
    }   
    const handleInput = (e,id) => 
    {
        const input = e.target.value
        if(e.target.name == "category")
        {
            // console.log(input)
            setCategory(input)
        } 
        else if(e.target.name == "item")
        {
            //console.log(input)
            setItem(input)
        }
        else if(e.target.name == "amount")
        {
            //  console.log(input)
            setAmount(input)
        }
        else
        {
            // console.log(input)
            setDate(input)
        }
    }
    const validations = () => 
    {
        if(!category)
        {
            errObj.category = "Category required"
        }
        else
        {
            formObj.category = category
        }
        if(!item)
        {
            errObj.item = "Item name required"
        }
        else
        {
            formObj.item = item
        }
        if(!amount)
        {
            errObj.amount = "Amount required"
        }
        else
        {
            formObj.amount = amount
        }
        if(!date)
        {
            errObj.expenseDate = "Date required"
        }
        else
        {
            formObj.expenseDate = date
        }
    }
    const handleSubmit = (e) => 
    {
        validations()
        if(Object.keys(errObj).length > 0)
        {
            setErrData(errObj)
        }
        else
        {
            if(editToggle)
            {
                formObj.budgetId = budgetId
                const result = categories.find((ele) => 
                {
                    return(ele.name == category)
                })
                // console.log('result-edited',result)
                formObj.categoryId = result._id
                setEditFormData(formObj)
                // console.log('formObj-edited',formObj)
                setErrData({})
                setCategory("")
                setItem("")
                setAmount("")
                setDate("")
            }
            else
            {
                formObj.budgetId = budgetId
                const result = categories.find((ele) => 
                {
                    return(ele.name == category)
                })
                // console.log('result-expenseModal',result)
                formObj.categoryId = result._id
                // console.log('formObj',formObj)
                setFormData(formObj)                
                setErrData({})
                setCategory("")
                setItem("")
                setAmount("")
                setDate("")
            }     
        }
    }
    const handleCancel = (e) => 
    {
        setFormData({})
        setErrData({})
        setCategory("")
        setItem("")
        setAmount("")
        setDate("")
    }

    return(
        <div> 
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className='mb-3' controlId='controlInput1'>
                            <Form.Label>Category*</Form.Label>
                            <Form.Select name="category" value={category} onChange={handleInput}>
                                <option>Select</option>
                                {categories.map((ele) => 
                                {
                                    return(<option key={ele._id}>{ele.name}</option>)
                                })}
                            </Form.Select>
                        </Form.Group>
                        <span style={{color:"red"}}>{(Object.keys(errData).length > 0) && (errData.category)}</span>
                        <Form.Group className='mb-3' controlId='controlInput2'>
                            <Form.Label>Item*</Form.Label>
                            <Form.Control type='text' name="item" value={item} onChange={handleInput}/>
                        </Form.Group>
                        <span style={{color:"red"}}>{(Object.keys(errData).length > 0) && (errData.item)}</span>
                        <Form.Group className='mb-3' controlId='controlInput3'>
                            <Form.Label>Amount*</Form.Label>
                            <Form.Control type='text' placeholder='in rupees' name="amount" value={amount} onChange={handleInput}/>
                        </Form.Group>
                        <span style={{color:"red"}}>{(Object.keys(errData).length > 0) && (errData.amount)}</span>
                        <Form.Group className='mb-3' controlId='controlInput4'>
                            <Form.Label>Date*</Form.Label>
                            <Form.Control type='date' name="date" value={date} onChange={handleInput}/>
                        </Form.Group>
                        <span style={{color:"red"}}>{(Object.keys(errData).length > 0) && (errData.expenseDate)}</span>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={handleSubmit}>Submit</Button>
                    <Button variant='secondary' onClick={handleCancel}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default ExpenseModal