import React,{useEffect, useState} from "react";
import { Pagination } from "react-bootstrap";


const ExpensePagination = (props) => 
{
    const {currentPage,setCurrentPage,paginationArr} = props
    
    const handlePageChange = (e,pageNum) => 
    {
        // console.log(pageNum)
        setCurrentPage(pageNum)
    }
   
    return(
        <div>
            <Pagination className="d-flex justify-content-center">
                {paginationArr.map((ele) => 
                {
                    return(
                        <Pagination.Item key={ele} onClick={(e) => {handlePageChange(e,ele)}} active={(currentPage==ele) ? true : false}>{ele}</Pagination.Item>
                    )
                })}
            </Pagination>
        </div>
    )
}
export default ExpensePagination