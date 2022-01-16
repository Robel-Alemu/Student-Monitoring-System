import React, { useRef, useState } from "react";
import { Card, Button,Container, Row, Col } from "react-bootstrap";
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
    // React.render(<Example />);
    // props.onEdit(editMessage);
    // history.push("/edit-broadcast-message");
  }

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
        alert(data.message);
        console.log(data);
        const refresh = () => {
          // re-renders the component
          setValue({});
        };
        refresh();
        //   setResponse(data);
      });

    setLoading(true);
    // React.render(<Example />);
    // props.onEdit(editMessage);
    // history.push("/edit-broadcast-message");
  }

  return (
    <li style={{ listStyle: "none" }}>
      <Card style={{marginTop: "30px"}}>
        {/* <Card.Header as="h5">{props.datePosted}</Card.Header> */}
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
              <Col md={1}>
                {" "}
                <Button variant="primary" onClick={editHandler}>
                  Edit
                </Button>
              </Col>
              <Col md={{ span: 1, offset: 0 }}>
                <Button variant="primary" onClick={updateHandler}>
                  Update
                </Button>
              </Col>
            </Row>
            {/* <Col sm={3}><Button  className="w-100" type="submit">
              Update
              </Button></Col>
    <Col sm={3}>
     
    <Button variant="primary" onClick={deleteHandler}>Delette</Button >
 </Col>
  </Row> */}
          </Container>
        </Card.Body>
      </Card>
    </li>
  );
}

export default BroadcastMessages;
