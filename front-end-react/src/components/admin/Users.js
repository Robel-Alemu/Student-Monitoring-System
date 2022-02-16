import React from "react";
import { Card, Button ,Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState ,useEffect} from "react";
function Users(props) {
  const history = useHistory();

  const [value, setValue] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  function deleteHandler(event) {
    // event.targetElement.
// document.getElementById('delete').
    event.preventDefault();
    if(window.confirm("Are you sure?")){

      
      const id = props.userId;
      
      fetch("http://localhost:8080/api/delete/" + id, {
        method: "DELETE",
        //   body: JSON.stringify(studentData),
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Account deleted successfuly") {
          setSuccess(data.message);
          setError("");
        } else {
          setError(data.message);
          setSuccess("");}
        // alert(data.message);
        console.log(data);
        
        const refresh = () => {
          // re-renders the component
          setValue({});
        };
        refresh();
        //   setResponse(data);
      });
    }
    
    // props.onEdit(editMessage);
  }
  useEffect(() => {}, []);                                        

  return (
   <div>{error && <Alert variant="danger">{error}</Alert>}
   {success && <Alert variant="success">{success}</Alert>}
   
   <li style={{ listStyle: "none" }}>

     <Card id="delete" style={{marginBottom:"30px"}}>
       <Card style={{margin:"2px"}}>
         <Card.Header>{props.name}</Card.Header>
         <Card.Body>
           <Card.Title>{props.role}</Card.Title>
           <Card.Text>Phone: {props.phone}</Card.Text>
           <Card.Text>Email: {props.email}</Card.Text>
           <Button variant="danger" onClick={deleteHandler}>
             Delete
           </Button>
         </Card.Body>
       </Card>{" "}
     </Card>
     {/* <Card.Header as="h5">{props.datePosted}</Card.Header> */}
   </li></div>
    
    
  );
}

export default Users;
