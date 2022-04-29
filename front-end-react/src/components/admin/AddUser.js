import { useRef } from "react";
import classes from "./AddUser.module.css";
// import Card from "../ui/Card"
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import Adminavigation from "./AdminNavigation";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";
import Login from "../authentication/Login";
import { useState } from "react";
function AddUser(props) {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const roleInputRef = useRef();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  let userRole = localStorage.getItem("role")

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const token = localStorage.getItem("token")
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
      "http://localhost:8080/api/Users",
      // "https://student-monitoring.herokuapp.com/api/Users",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "User Account created successfully") {
          setSuccess(data.message);
          setError("");
          setTimeout(() => {  setSuccess(""); }, 2000);
        } else {
          setError(data.message);
          setSuccess("");
          setTimeout(() => {  setError(""); }, 2000);
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

  if (userRole == "Admin"){

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
              <svg  style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>  Add User
              </Button>
            </Form></Card.Body>
    
  </Card></LayoutCenter>
      
    
  );
  }
  else {
    return(
      <Login />
  )
  }
}

export default AddUser;
