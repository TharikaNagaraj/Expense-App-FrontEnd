// import React from 'react'
// import {Chart} from 'react-google-charts'

// // import DonutChart from 'react-donut-chart'
// import playgroundcss from "./playground.module.css"

// const Playground = (props) => 
// {
//     const reactDonutChartData = [
//         {
//             label:"Expenditure",
//             value:5000,
//             color:"#009688"
//         },
//         {
//             label:"Budget",
//             value:1000,
//             color:"#ff9800"
//         },
        
//     ]
//     const reactDonutChartBackgroundColor = [
//         "#009688",
//         "#ff9800"
//     ]
//     const reactDonutChartInnerRadius = 0.65
//     const reactDonutChartSelectedOffset = 0.015

//     const pieChartData = [
//         ["Task","Hours per day"],
//         ["Work",11],
//         ["Eat",2],
//         ["Commute",2],
//         ["Watch TV",2],
//         ["Sleep",7]
//     ]
//     const options = {
//         title:"My daily activities"
//     }

//     return(
//         // <DonutChart className={playgroundcss.chartStyle}
//         // data={reactDonutChartData}
//         // colors = {reactDonutChartBackgroundColor}
//         // innerRadius = {reactDonutChartInnerRadius}
//         // selectedOffset = {reactDonutChartSelectedOffset}
//         // />
//         <Chart
//         className={playgroundcss.piechartStyle}
//         chartType='PieChart'
//         data={pieChartData}
//         options={options}
//         width={"60%"}
//         height={"500px"}    />
//     )
// }

// export default Playground


// import React,{useState} from 'react'
// import {Button,Modal} from 'react-bootstrap'

// const Playground = (props) => 
// {
//     const [show,setShow] = useState(false)
//     const handleModal = (e) => 
//     {
//         setShow(!show)
//     }
//     const handleClose = (e) => 
//     {
//         setShow(!show)
//     }
//     return(
//         <div>
//             <button onClick={handleModal}>Show modal</button>
//             <Modal show={show}>
//                 <Modal.Header>
//                     <Modal.Title>Add expenses</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <p>Hello there!</p> 
//                     <form>
//                         <label>Name</label>
//                         <input type="text"/><br /><br />
//                         <label>category</label>
//                         <select>
//                             <option>Select</option>
//                             <option>Pencil</option>
//                             <option>Eraser</option>
//                             </select>
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant='primary' onClick={handleClose}>Close</Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
        
//     )       
// }
// export default Playground

import React, { useEffect, useState } from "react";
import {Chart} from 'react-google-charts'
import axios from "axios"
import playgroundcss from "./playground.module.css"

const Playground = (props) => 
{
    const[amount,setAmount] = useState("")
    const [expenses,setExpenses] = useState([])
    const [totalExpense,setTotalExpense] = useState("")
    const[formData,setFormData] = useState({})
    const [budget,setBudget] = useState("")
   
    useEffect(() => 
    {

        axios.get("http://localhost:3050/api/users/budget")
            .then((ele) => 
            {
                // console.log('budget',ele.data)
                ele.data.forEach((budget) => 
                {
                    // console.log('amount',budget.Amount)
                    setBudget(budget.Amount)
                })
               
            })
            .catch((err) => 
            {
                console.log(err)
            })
    },[])
    useEffect(() => 
    {
     
        axios.get("http://localhost:3050/api/users/expenses")
            .then((expenses) => 
            {
                // console.log('expenses',expenses.data)
                const result = expenses.data.filter((ele) => 
                {
                    return (!(ele.hasOwnProperty("category")))
                })
                console.log('result',result)
                setExpenses(result)
                let total = 0
                result.forEach((ele) => 
                {
                    
                    total += ele.amount
                })
                setTotalExpense(total)
                
            })
    },[])
    
    useEffect(() => 
    {
       
        if(Object.keys(formData).length >0)
        {
            axios.post("http://localhost:3050/api/users/expense",formData)
            .then((ele) => 
            {   
                // console.log("expenses",ele.data)
                let result = [...expenses,{...ele.data}]
                setExpenses(result)
                console.log('result',result)
                let total = 0
                result.forEach((ele) => 
                {
                    total += ele.amount
                })
                console.log(total)
                setTotalExpense(total)
                
            })
            .catch((err) => 
            {
                console.log(err)
            })
        }
       
    },[formData])
    const handleInput = (e) => 
    {
        setAmount(e.target.value)
    }
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        const obj = {
            amount : amount
        }
        setFormData(obj)
    }
    // const donutChartData = [
    //     ["Title","Amount"],
    //     ["Budget",budget],
    //     ["expenses",totalExpense]
    // ]
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
       let expArr = [["expense","amount"]] 
       expenses.forEach((ele) => 
       {
            let newArr = []
            newArr.push(ele._id,ele.amount)
            expArr.push(newArr)
       })
       return expArr
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
    return(
        <div className="row">
        <div className="col-md-12">
            <Chart
                // className={`${dashboardcss.donutchartStyle}`}
                className={`${playgroundcss.chart1Style}`}
                chartType="PieChart"
                data={[["Title","Amount"],["Budget",budget],["Expenses",totalExpense]]}
                options={donutChartOptions}
                width={"55%"}
                height={"400px"}
            />
            <Chart
            className={`${playgroundcss.chart2Style}`}
            chartType='PieChart'
            data={pieChartData()}
            options={options}
            width={"55%"}
            height={"300px"}
            />
        </div>
        <div className={`col-md-6 ${playgroundcss.myStyle}`}>
            <h3>budget-{budget}</h3>
            <h3>Total expense - {totalExpense}</h3>
            <form>
                    <label>Add expense</label>
                    <input type="text" onChange={handleInput} value={amount}/><br />
                    <input type="submit" onClick={handleSubmit}/>
            </form>
       </div>
        </div>
    )
}
export default Playground