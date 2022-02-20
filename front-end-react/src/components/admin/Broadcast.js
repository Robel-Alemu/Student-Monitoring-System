import { useRef } from "react";
import Layout from "../layout/Layout";
import Card from "../ui/Card";
import { Form, Button } from "react-bootstrap"
import LayoutCenter from "../layout/LayoutCenter";
function Broadcast(props) {
  const broadcastRef = useRef();
  const titleRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const broadcastMessage = broadcastRef.current.value;
   const title = titleRef.current.value;
    const date = new Date();

    const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
    const message = {
        title: title,
        datePosted :  currentDate,
        message : broadcastMessage

    };

    props.onAddBroadcastMessage(message);

}
    return (
     <LayoutCenter><Card>
     <Form onSubmit={submitHandler}>
     <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" ref={titleRef} size="sm" required />
              </Form.Group>
       <Form.Group controlId="exampleForm.ControlTextarea1">
         
         <Form.Label>Message</Form.Label>
         <Form.Control
           as="textarea"
           rows={6}
           ref={broadcastRef}
           required
         />
       </Form.Group>
       
       <Button  className="w-100" type="submit">
         Broadcast Announcement
       </Button>
     </Form>
   </Card></LayoutCenter>
        
      
    );
  }

export default Broadcast;