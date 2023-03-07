
const initialState = []

const userReducer = (state = initialState,action) => 
{
    if(action.type == "SIGN_IN")
    {
        return[action.payload]  
    }
    else if(action.type == "ADD_BUDGET")
    {
        return[{...action.payload}]
    }
    else if(action.type == "USER_REGISTER")
    {
        return[{...action.payload}]
    }
    else
    {
        return [...state]
    }
}
export default userReducer