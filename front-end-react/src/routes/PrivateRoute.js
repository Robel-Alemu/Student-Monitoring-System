import React, { useState ,useEffect} from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../AuthContext/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
// const [userExist,setUserExist]= useState(true)
  


// const [isLoading, setIsLoading] = useState(true);
// const [loadedStudents, setLoadedStudents] = useState([]);

//  let y = true;
// useEffect(() => {
//   setIsLoading(true);
// fetch(
//     "http://localhost:8080/api/users"
//     // "https://student-monitoring.herokuapp.com/api/users"
//     )
//   .then((response) => {
//     console.log(response);
//     return response.json();
//   })
//   .then((data) => {
    
//     if (data.message == "No Account record found") { 
//       setUserExist(false)
//      console.log(userExist,"no accccccccc") 
//      y=userExist
//       console.log(y,"**************")
    
//     }
//     console.log(y,"********/////******")
    
//     setIsLoading(false);
//     setLoadedStudents(data.message);
        
    
//     }
   
   
//   );
// }, []);
// function x(){
//   if(y == true) y= <Redirect to="/login" />
//   else if (y == false) y=<Redirect to="/signup" />
//   return y;
// }

// if (isLoading) {
//   return (<section>Hello</section>)
// }
  return (
    <Route
      {...rest}
      render={props => {

// if(currentUser) return <Component {...props} />
// else if(y == false ) return <Redirect to="/signup" />
// else if(y == true) return <Redirect to="/login" />


         return currentUser  ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}
