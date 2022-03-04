
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Broadcast from "../admin/Broadcast";
import Login from "../authentication/Login";

function AddBroadcastPage() {
  const history = useHistory();
  let userRole = localStorage.getItem("role")
//   const [responses, setResponse] = useState();
  function addBroadcaastHandler(message) {
    
    fetch(
      "http://localhost:8080/api/broadcast-message",
      // "https://student-monitoring.herokuapp.com/api/broadcast-message",
      {
        method: "POST",
        body: JSON.stringify(message),
        headers: { "Content-Type": "application/json" },
      }
      
      )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        alert(data.message);
        console.log(data);
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
