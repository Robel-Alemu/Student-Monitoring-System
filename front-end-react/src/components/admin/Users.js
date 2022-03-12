import React from "react";
import { Card, Button ,Alert} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState ,useEffect} from "react";
function Users(props) {
  const history = useHistory();
  const token = localStorage.getItem("token")
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
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
      })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Account deleted successfuly") {
          setSuccess(data.message);
          setError("");
          setTimeout(() => {  setSuccess(""); }, 1000);
        } else {
          setError(data.message);
          setSuccess("");}
        // alert(data.message);
        console.log(data);
        setTimeout(() => {  setError(""); }, 3000);
      
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
   <div>{error && <Alert style={{marginTop:"20px"}} variant="danger">{error}</Alert>}
   {success && <Alert style={{marginTop:"20px"}} variant="success">{success}</Alert>}
   
   <li style={{ listStyle: "none" }}>

     <Card id="delete" style={{marginBottom:"30px"}}>
       <Card style={{margin:"2px"}}>
         <Card.Header>{props.name}</Card.Header>
         <Card.Body>
           <Card.Title>{props.role}</Card.Title>
           <Card.Text><svg style={{marginRight:"3px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
</svg> {props.phone}</Card.Text>
           <Card.Text><svg style={{marginRight:"3px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
</svg> {props.email}</Card.Text>
           <Button variant="danger" onClick={deleteHandler}>
           <svg style={{marginRight:"7px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-x" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  <path fill-rule="evenodd" d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"/>
</svg> Delete User
             
           </Button>
         </Card.Body>
       </Card>{" "}
     </Card>
     {/* <Card.Header as="h5">{props.datePosted}</Card.Header> */}
   </li></div>
    
    
  );
}

export default Users;
