import { useRef } from "react";
import classes from "./AddUser.module.css";
// import Card from "../ui/Card"
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import Adminavigation from "./AdminNavigation";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import { useState } from "react";
function AddUser(props) {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const roleInputRef = useRef();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  function submitHandler(event) {
   
    
    const enteredName = nameInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    const enteredRole = roleInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    
    const userData = {
      name: enteredName,
      phone: enteredPhone,
      role : enteredRole,
      email: enteredEmail,
      password : enteredPassword
    };
    
    event.preventDefault();

    fetch(
      "https://student-monitoring.herokuapp.com/api/Users",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "User Account created successfully") {
          setSuccess(data.message);
          setError("");
        } else {
          setError(data.message);
          setSuccess("");
        }
        // alert(data.message);
        console.log(data)
       
      }
    );
        
    props.onSignup(userData);
  }

  function loadHandler(event){
    event.preventDefault();
    var email = document.getElementById("email");
    email.value = " ";
    var password = document.getElementById("password");
    password.value = " ";

  }

  

  return (
    <LayoutCenter><Card>

<Card.Body>
            <h3 className="text-center mb-4">Add User</h3>

            {/* {error && <Alert variant="danger">{error}</Alert>} */}

            {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={submitHandler} onLoad={loadHandler} autocomplete="off">
              <Container>
                <Row>
                  <Col sm = {6}>
                  <Form.Group id="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameInputRef} size="sm" required />
              </Form.Group>
              <Form.Group id="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" ref={phoneInputRef} size="sm" required />
              </Form.Group>
                  </Col>
                
                  <Col sm ={6}> <Form.Group id="role">
              <Form.Label>Role</Form.Label>
                <Form.Control size="sm" as="select" ref={roleInputRef} required>
                  <option>Admin</option>
                  <option>Data Encoder</option>
                  
                </Form.Control>
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>email</Form.Label>
                <Form.Control type="email" ref={emailInputRef} size="sm" required  autoComplete="new-email"/>
              </Form.Group></Col>
                </Row>
              </Container>
              
             
              
            

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" size="sm" ref={passwordInputRef} required autoComplete="new-password" />
              </Form.Group>
              
              <Button  className="w-100" type="submit">
                Add User
              </Button>
            </Form></Card.Body>
    
  </Card></LayoutCenter>
      
    
  );
}

export default AddUser;
