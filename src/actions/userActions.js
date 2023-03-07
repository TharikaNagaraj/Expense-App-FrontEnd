import axios from 'axios'


export const startSignIn = (url,formData) => 
{
    return (dispatch) => 
    {
        axios.post(url,formData)
        .then((ele) =>
        {
            const data = ele.data
            dispatch(
                {
                    type:"SIGN_IN",
                    payload : data
                }
            )
        })
        .catch((err) => 
        {
            console.log(err)
        })
    }
}

export const startBudgetInfo = (url) => 
{
    return(dispatch) => 
    {
        axios.get(url,{
                        headers:{
                            "Authorization":`Bearer ${localStorage.getItem('token')}`
                        }
                    })
            .then((ele) => 
            {
                const data = ele.data
                dispatch({
                    type:"ADD_BUDGET",
                    payload:data
                })
            })
            .catch((err) => 
            {
                console.log(err)
            })
    }
}

export const startUserRegister = (url,formData) => 
{
    return (dispatch) => 
    {
        axios.post(url,formData)
            .then((ele) => 
            {
                const data = ele.data
                dispatch({
                    type:"USER_REGISTER",
                    payload:data
                })
            })
            .catch((err) => 
            {
                console.log(err)
            })
    }
}       