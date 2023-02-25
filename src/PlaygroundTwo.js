import React,{useState,useEffect} from 'react'
import { Pagination } from 'react-bootstrap'
import axios from 'axios'

const PlaygroundTwo = (props) => 
{
    const [pagArr,setPagArr] = useState([])
    const [currentPage,setCurrentPage] = useState(1)
    const [dataPerPage,setDataPerPage] = useState(10)
    const[posts,setPosts] = useState([])

    useEffect(() => 
    {
        axios.get("https://jsonplaceholder.typicode.com/posts")
            .then((ele) => 
            {
                console.log("posts",ele.data)
                setPosts(ele.data)
                const totalPages = (ele.data.length)/(dataPerPage)
                console.log(totalPages)
                let arr = []
                for(let i=0;i<totalPages;i++)
                {
                    arr.push(i+1)
                }
                console.log(arr)
                setPagArr(arr)
            })          
            .catch((err) => 
            {
                console.log(err)
            })
    },[])

    const handleCurrentPage = (e,num) => 
    {
        console.log(num)
        setCurrentPage(num)
    }
    return(
        <div className='container'>
            <div>{(posts.map((ele,i) => 
            {
                return(<p key={i}>{(currentPage==ele.userId) && (ele.title)}</p>)
            }))}</div>
            <Pagination>
                {pagArr.map((ele,i) => 
                {
                    return(<Pagination.Item key={i} onClick={(e) => {handleCurrentPage(e,ele)}} active={(currentPage==ele) ? true : false}>{ele}</Pagination.Item>)
                })}
            </Pagination>
        </div>
    )
}
export default PlaygroundTwo