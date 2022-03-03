
// // import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import AddUser from "../admin/AddUser";
// function AddNewUserPage() {
//   //const history = useNavigate();
//   const [response, setResponse] = useState();
//   function addUserHandler(userData) {
//     fetch(
//       "http://localhost:8080/api/Users",
//       {
//         method: "POST",
//         body: JSON.stringify(userData),
//         headers: { "Content-Type": "application/json" },
//       }
//     ).then((response) => {
//       // console.log(response);
//       return response.json();
//     })
//     .then((data) => {

//       console.log(data);
      
//       setResponse(data);

//     });
    
  
//     // ).then(() => {
//     //   history("/");
//     // });
    
//     }
 
//   return (
//     <section>
//       <h1>Add new User </h1>
//       <AddUser onAdd = { addUserHandler }   />
//     </section>
//   );
// }

// export default AddNewUserPage;





















import React from 'react';
import ReactDOM from 'react-dom';

import axios from "axios";
import { render } from "react-dom";
import { useHistory } from "react-router-dom";
import AddUser from "../admin/AddUser";
import AllUsersPage from "./AllUsersPage";
function AddNewUserPage() {
  const history = useHistory();
  function addUserHandler(userData) {
    fetch(
      "http://localhost:8080/api/Users",
      // "https://student-monitoring.herokuapp.com/api/Users",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        console.log(data)
       
     

    }
  );
  }
   
    
  return (
   
      <AddUser onSignup={addUserHandler}  />
    
  );

  }

export default AddNewUserPage;
