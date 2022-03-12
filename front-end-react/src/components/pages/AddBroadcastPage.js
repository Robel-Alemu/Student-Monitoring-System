
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {Alert } from "react-bootstrap"
import Broadcast from "../admin/Broadcast";
import Login from "../authentication/Login";

function AddBroadcastPage() {
  const history = useHistory();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  let userRole = localStorage.getItem("role")
  const token = localStorage.getItem("token")
//   const [responses, setResponse] = useState();
  function addBroadcaastHandler(message) {
    
    fetch(
      "http://localhost:8080/api/broadcast-message",
      // "https://student-monitoring.herokuapp.com/api/broadcast-message",
      {
        method: "POST",
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
      }
      
      )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        // console.log(data);
        if (data.message == "Announcement Added Successfully!") {
          setSuccess(data.message);
          setError("");
     
        } else {
          setError(data.message);
          setSuccess("");
       
         
        }
        history.push('/');
        // setResponse(data);

      });
     
    // ).then(() => {
    //   history("/");
    // });
    
  }
 
  if (userRole == "Admin"){
  return (
    <section>
           {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
      <Broadcast onAddBroadcastMessage = {addBroadcaastHandler} />
    </section>
  );
  }
  else{
    return(
      <Login/>
    )
  }
}

export default AddBroadcastPage;
