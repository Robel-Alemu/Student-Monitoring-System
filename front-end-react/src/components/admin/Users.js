import React from "react";
import { Card, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";
function Users(props) {
  const history = useHistory();

  const [value, setValue] = useState();
  function deleteHandler(event) {
    

    event.preventDefault();
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
        alert(data.message);
        console.log(data);

        const refresh = () => {
          // re-renders the component
          setValue({});
        };
        refresh();
        //   setResponse(data);
      });

    // props.onEdit(editMessage);
  }

  return (
    <li style={{ listStyle: "none" }}>
      <Card style={{marginBottom:"30px"}}>
        <Card style={{margin:"2px"}}>
          <Card.Header>{props.name}</Card.Header>
          <Card.Body>
            <Card.Title>{props.role}</Card.Title>
            <Card.Text>Phone: {props.phone}</Card.Text>
            <Card.Text>Email: {props.email}</Card.Text>
            <Button variant="primary" onClick={deleteHandler}>
              Delete
            </Button>
          </Card.Body>
        </Card>{" "}
      </Card>
      {/* <Card.Header as="h5">{props.datePosted}</Card.Header> */}
    </li>
  );
}

export default Users;
