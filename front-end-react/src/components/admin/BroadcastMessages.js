import React, { useRef, useState } from "react";
import { Card, Button,Container, Row, Col,Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Example from "./Modal";

import ReactDOM from "react-dom";
function BroadcastMessages(props) {
  const [loading, setLoading] = useState(true);
  const message = useRef();

  const history = useHistory();
  function editHandler(event) {
    event.preventDefault();
    const id = props.id;
    const date = props.datePosted;
    const message = props.message_;

    const editMessage = {
      datePosted: date,
      message: message,
    };

    setLoading(false);
    
  }
  const [error,setError] = useState();
  const [success,setSuccess] = useState();
  const [value, setValue] = useState();

  function updateHandler(event) {
    event.preventDefault();
    const id = props.id_;
    const date = props.datePosted;
    const updatedMessage = message.current.value;

    const editMessage = {
      datePosted: date,
      message: updatedMessage,
    };

    fetch("http://localhost:8080/api/update-message/" + id, {
      method: "PUT",
      body: JSON.stringify(editMessage),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        if (data.message == "Message Updated successfuly") {setSuccess(data.message);
          setError("");
          setTimeout(() => {  setSuccess(""); }, 1000);
        }
  
          else {setError(data.message);
                  setSuccess("");
                  setTimeout(() => {  setError(""); }, 1000);
                }
        console.log(data);
        const refresh = () => {
          // re-renders the component
          setValue({});
        };
        refresh();
        //   setResponse(data);
      });

    setLoading(true);

  }

  return (
    
    <div>
      {error && <Alert style={{marginTop:"20px"}} variant="danger">{error}</Alert>}
          {success && <Alert  style={{marginTop:"20px"}} variant="success">{success}</Alert>}
    
    <li style={{ listStyle: "none" }}>
      <Card style={{marginTop: "30px"}}>
        <Card.Header as="h3">{props.title}</Card.Header>
        <Card.Body>
          <Card.Title>Date: {props.datePosted}</Card.Title>

          <Card.Text>Message</Card.Text>
          <Card.Text>
            <textarea
              rows={3}
              className="form-control"
              disabled={loading}
              ref={message}
            >
              {props.message_}
            </textarea>
          </Card.Text>

          <Container>
            {/* <Row> */}
            <Row>
              <Col sm={3}>
                
                <Button variant="warning" onClick={editHandler}>
                <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>   Edit
                 
                </Button>
              </Col>
              <Col sm={4} >
                <Button variant="success" onClick={updateHandler}>
                <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>  Update
                  
                </Button>
              </Col>
            </Row>
         
          </Container>
        </Card.Body>
      </Card>
    </li>
    </div>
  );
}

export default BroadcastMessages;
