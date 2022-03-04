import { useRef } from "react";
import Layout from "../layout/Layout";
import Card from "../ui/Card";
import { Form, Button } from "react-bootstrap"
import LayoutCenter from "../layout/LayoutCenter";
import Login from "../authentication/Login";
function EditBroadcastMessage(props) {
  const broadcastRef = useRef();
  let userRole = localStorage.getItem("role")
  function submitHandler(event) {
    event.preventDefault();

    const broadcastMessage = broadcastRef.current.value;

    const date = new Date();

    const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
    const message = {

        datePosted :  currentDate,
        message : broadcastMessage

    };

    props.onAddBroadcastMessage(message);

}
if (userRole == "Admin"){
    return (
     <LayoutCenter><Card>
     <Form onSubmit={submitHandler}>
       <Form.Group controlId="exampleForm.ControlTextarea1">
         <Form.Label>Message</Form.Label>
         <Form.Control
           as="textarea"
           rows={6}
           ref={broadcastRef}
           required
         >{props.message}</Form.Control>
       </Form.Group>
       
       <Button  className="w-100" type="submit">
         Broadcast Message
       </Button>
     </Form>
   </Card></LayoutCenter>
        
      
    );
}
else{
  return(
    <Login/>
  )
}
  }

export default EditBroadcastMessage;