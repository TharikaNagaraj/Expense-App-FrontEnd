import React,{useState,useEffect} from 'react'
import ExpenseNavbar from './ExpenseNavbar'
import {Chart} from 'react-google-charts'
// import DonutChart from './DonutChart'
import dashboardcss from "./dashboard.module.css"
import axios from 'axios'
import ExpenseModal from './ExpenseModal'
import ExpenseItem from './ExpenseItem'
// import Playground from './playground'
import myImage from "./chart_placeholder.jpg"
import { Redirect } from 'react-router-dom'

const Dashboard = (props) => 
{
    const {deleteToken} = props
    const [budget,setBudget] = useState("")
    const [budgetId,setBudgetId] = useState("")
    const [expenses,setExpenses] = useState([])
    const [totalExpense,setTotalExpense] = useState("")
    const [categories,setCategories] = useState([])
    const [expenseToggle,setExpenseToggle] = useState(false)
    const [modalFormData,setModalFormData] = useState({})

    const updateExpense = (data) => 
    {
        // console.log('update expense-dash',data)
        const result = expenses.map((ele) => 
        {
            if(ele._id == data._id)
            {
                return {...ele,...data}
            }
            else
            {
                return ele
            }
        })
        // console.log('update-dash',result)
        setExpenses(result)
        let totalAmount = 0
        result.forEach((ele) => 
        {
            totalAmount += ele.amount
        })
        setTotalExpense(totalAmount)
    }
    const postExpense = (data) => 
    {
        const result = [...expenses,{...data}]
        // console.log("PE")
        // console.log('result',result)
        setExpenses(result)
        let totalAmount = 0
        result.forEach((ele) => 
        {
            totalAmount += ele.amount
        })
        setTotalExpense(totalAmount)
        // console.log('TA',totalAmount)
    }
    const deleteExpense = (data) => 
    {
        const result = expenses.filter((ele) => 
        {
            return (ele._id != data._id)
        })
        setExpenses(result)
        // console.log("result-deleteexpense",result)
        let totalAmount = 0
        result.forEach((ele) => 
        {
            totalAmount += ele.amount
         })
        // console.log('TA',totalAmount)
        setTotalExpense(totalAmount)
    }

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/users/budget",{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((ele) => 
            {
                // console.log(ele)
                const data = ele.data
                // console.log('dash',data)
                // console.log('Amt',data.Amount)
                data.forEach((budgetData) => 
                {
                    console.log('Db',budgetData.Amount)
                    setBudget(budgetData.Amount)
                    setBudgetId(budgetData._id)
                })               
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[])
    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/users/expense",{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((ele) => 
            {
                    // console.log("expenses-dashboard",ele)
                    if(!(ele.data == "no expenses found"))
                    {
                        setExpenses(ele.data)
                        // ele.data.forEach((expenses) => 
                        // {
                        //     console.log("categoryId",expenses.categoryId)
                        // })
                        let expenseTotal = 0
                        ele.data.forEach((data) => 
                        {
                            expenseTotal += data.amount
                        })
                        setTotalExpense(expenseTotal)
                    }
               
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[])

    useEffect(() => 
    {
        axios.get("http://localhost:3050/api/users/categories",{
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((ele) =>
            {
                // console.log('categories',ele.data)
                setCategories(ele.data)
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[])

    const donutChartData = [
        ["Title","Amount"],
        ["Budget",(budget - totalExpense)],
        ["expenses",totalExpense]
    ]
    const donutChartOptions = {
        title:"Budget Overview",
        pieHole:0.40,
        is3D:false,
        slices:{
            0 : {color : "orangered"},
            1: {color : "darkgreen"}
        }
        
    }

    const pieChartData = () => 
    {
        let categoriesArray = []
        let catExpArr = [["category","amount"]]
        categories.forEach((ele) => 
            {
                categoriesArray.push(ele.name)   
                    
            })
            // console.log("CA",categoriesArray)    
            categoriesArray.forEach((name) => 
            {
               const result = expenses.filter((expense) => 
               {
                    return(name == expense.category)
               })
            //    console.log('EAR',result)
               if(result.length > 0)
               {
                    let expenseAmount = 0
                    result.forEach((ele) => 
                    {
                        expenseAmount += ele.amount
                    })
                    const newArr = new Array(name,expenseAmount)
                    catExpArr.push(newArr)
               }
            })
            // console.log("catExpArr",catExpArr)
            return(catExpArr)      
    }
  
    const options = {
        title:"Expenses chart",
        slices:{
            0 : {color : "fuchsia"},
            1: {color : "deepskyblue"},
            2: {color : "lawngreen"},
            3: {color: "rosybrown"},
            4: {color : "mediumslateblue"}
        }
    }
    const toggle = () => 
    {
        setExpenseToggle(!expenseToggle)
    }
    const handleAddExpense = (e) => 
    {
        toggle()
    }   
    return(
        <div className={dashboardcss.bodyStyle}>
            <ExpenseNavbar deleteToken={deleteToken}/>
            <div className='row'>
                {(budget) ? 
                ( <div>
                    <div className='col-md-12'>
                        <Chart
                            className={`${dashboardcss.donutchartStyle}`}
                            chartType="PieChart"
                            data={donutChartData}
                            options={donutChartOptions}
                            width={"55%"}
                            height={"400px"}
                        />
                        {(expenses.length >0) ? (<Chart
                            className={dashboardcss.piechartStyle}
                            chartType='PieChart'
                            data={pieChartData()}
                            options={options}
                            width={"55%"}
                            height={"300px"}
                        />) : (<img src={myImage} className={`${dashboardcss.placeholderStyle}`}/>) }                       
                    </div>
                    <div className={`col-md-6 ${dashboardcss.addbtnStyle}`}><button className='btn btn-primary' type='button' data-toggle="modal" onClick={handleAddExpense}>Add expenses</button></div>
                    {/* <div className={`col-md-6 ${dashboardcss.deletebtnStyle}`}><button className='btn btn-primary'>Delete expenses</button></div> */}
                    {(expenseToggle) && (<ExpenseModal toggle={toggle} expenseToggle={expenseToggle} categories={categories}
                                        postExpense={postExpense} modalHeader="Add expense" budgetId={budgetId}/>)}

                    {(expenses.length > 0) && (<div className='col-md-12'>
                        <ExpenseItem expenses={expenses}  deleteExpense={deleteExpense} 
                        updateExpense={updateExpense} categories={categories}  budgetId={budgetId}/>
                    </div>)}
                    </div>      
                )
                :
                (
                <div> 
                    <p className={dashboardcss.paraStyle}>No budget added ! Go to the settings page to add a budget.</p>
                </div>
                )
            }
            </div>
        </div>
    )
}
export default Dashboard