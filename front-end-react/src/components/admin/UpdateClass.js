import { useRef } from "react";
import classes from "./AddUser.module.css";
// import Card from "../ui/Card"
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import Adminavigation from "./AdminNavigation";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import { useState } from "react";
function UpdateClass() {
  const classInputRef = useRef();
  const sectionInputRef = useRef();
//   const roleInputRef = useRef();
//   const emailInputRef = useRef("");
//   const passwordInputRef = useRef("");

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
    const [sections,setSections] = useState();
    const [isRequired,setIsRequired] = useState(true)
const section = [];

    function sectionHandler(e){
        e.preventDefault();
        const sectionName = sectionInputRef.current.value;
        section.push(sectionName)
        document.getElementById("sec").value=null;
setIsRequired(false);
    
      }

  function submitHandler(event) {
   
    
    const className = classInputRef.current.value;
    const sectionName = sectionInputRef.current.value;
    // const enteredRole = roleInputRef.current.value;
    // const enteredEmail = emailInputRef.current.value;
    // const enteredPassword = passwordInputRef.current.value;
    let uniqueSections = [...new Set(section)];

    const classData = {
      class: className,
      sections: uniqueSections,
      
    };
    console.log(classData);
    console.log(uniqueSections,"unique");
    
    event.preventDefault();

    fetch(
      "http://localhost:8080/api/update-class/"+className,
      {
        method: "PUT",
        body: JSON.stringify(classData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "class updated successfully") {
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
        
    
  }

  



  

  return (
    <LayoutCenter><Card>

<Card.Body>
            <h3 className="text-center mb-4">Update Class</h3>

            {/* {error && <Alert variant="danger">{error}</Alert>} */}

            {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={submitHandler} >
              <Container>
                <Row>
                  <Col sm = {3}>
                  <Form.Group id="class">
                <Form.Label>Class</Form.Label>
                <Form.Control type="text" placeholder="Enter Class" ref={classInputRef} size="sm" required />
              </Form.Group>
              </Col>
              <Col  sm={3}><Form.Group id="section">
                <Form.Label>Section</Form.Label>
                <Form.Control id="sec" type="text" placeholder="Enter Section" ref={sectionInputRef} size="sm" required={isRequired} />
              </Form.Group></Col>
              
              
                  <Col style={{marginTop:"30px"}} sm={4}><Button  className="w-100" onClick={sectionHandler}>
                Add Section
              </Button></Col> 
                
                  
                </Row>
              </Container>
            
              <Button style={{marginTop:"30px"}} sm={4}  className="w-100" type="submit">
                Update Class
              </Button>
            </Form></Card.Body>
    
  </Card></LayoutCenter>
      
    
  );
}

export default UpdateClass;
