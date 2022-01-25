import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext"

export default function PrivateRouteRoleCheck({ component: Component, ...rest }) {
  const { currentUser,getUser } = useAuth()
const email = currentUser.email;
async function getUserRole(email){
    const user = await getUser(email);
    if (user.message === 'Account does not exist!'){
      console.log(user.message);
    }
    else 
    console.log(user.role)
    return user.role;
}
const user = getUserRole(email)
      console.log(user);
  return (
    <Route
      {...rest}
      render={props => {
         
        return  (user === ('Admin'))  ?   <Redirect to="/login" /> :<Component {...props} />
      
        
      }}
    ></Route>
  )
}
