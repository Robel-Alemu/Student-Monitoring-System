import { useRef } from "react";
import classes from "./AddUser.module.css";
// import Card from "../ui/Card"
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import Adminavigation from "./AdminNavigation";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";


function AddUser(props) {
  const nameInputRef = useRef();
  const phoneInputRef = useRef();
  const roleInputRef = useRef();
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  function submitHandler(event) {
   
    event.preventDefault();

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
                <Form.Control type="email" ref={emailInputRef} size="sm" required  defaultValue={""}/>
              </Form.Group></Col>
                </Row>
              </Container>
              
             
              
            

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" size="sm" ref={passwordInputRef} required defaultValue={""} />
              </Form.Group>
              
              <Button  className="w-100" type="submit">
                Add User
              </Button>
            </Form></Card.Body>
    
  </Card></LayoutCenter>
      
    
  );
}

export default AddUser;
