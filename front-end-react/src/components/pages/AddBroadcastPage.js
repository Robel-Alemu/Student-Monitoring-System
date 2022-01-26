
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import Broadcast from "../admin/Broadcast";

function AddBroadcastPage() {
  const history = useHistory();
//   const [responses, setResponse] = useState();
  function addBroadcaastHandler(message) {











    fetch(
      "http://localhost:8080/api/broadcast-message",
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
 
  return (
    <section>
      
      <Broadcast onAddBroadcastMessage = {addBroadcaastHandler} />
    </section>
  );
}

export default AddBroadcastPage;
