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
// date.setDate(date.getDate()+20)

    // const currentDate = ` '0'+ ${date.getDate()}/ '0'+ ${date.getMonth()+1}/${date.getFullYear()}`;
    const currentDate = ('0' + date.getDate()).slice(-2) + '/'
    + ('0' + (date.getMonth()+1)).slice(-2) + '/'
    + date.getFullYear();
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
                <Form.Label style={{marginLeft:"15px", marginTop:"15px"}}>Title</Form.Label>
                <Form.Control type="text" ref={titleRef} size="sm" required style={{marginLeft:"15px", width:"95%"}}/>
              </Form.Group>
       <Form.Group controlId="exampleForm.ControlTextarea1">
         
         <Form.Label style={{marginLeft:"15px"}}>Message</Form.Label>
         <Form.Control
           as="textarea"
           rows={6}
           ref={broadcastRef}
           style={{marginLeft:"15px", width:"95%"}}
           required
         />
       </Form.Group>
      <div style={{display:"flex", justifyContent:"center"}}>
      <Button style={{marginBottom:"20px"}}  className="w-50" type="submit">
         Broadcast Announcement
       </Button>
      </div>

     </Form>
   </Card></LayoutCenter>
        
      
    );
  }

export default Broadcast;