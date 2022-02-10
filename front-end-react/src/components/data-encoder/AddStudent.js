import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Col ,Row} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";


 function AddStudent(props) {
   const studentId = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();

  const parent1NameRef = useRef();
  const parent1PhoneRef = useRef();
  const parent2NameRef = useRef();
  const parent2PhoneRef = useRef();
  
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function submitHandler(event) {
    // event.preventDefault();
    const enteredStudentId = studentId.current.value;
    const enteredFirstName = firstName.current.value;
    const enteredLastName = lastName.current.value;
    const enteredGrade = gradeRef.current.value;
    const enteredSection = sectionRef.current.value;
    const enteredParent1Name = parent1NameRef.current.value;
    const enteredParent1Phone = parent1PhoneRef.current.value;
    const enteredParent2Name = parent2NameRef.current.value;
    const enteredParent2Phone = parent2PhoneRef.current.value;

    const studentData = {
      studentId : enteredStudentId,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      grade: enteredGrade,
      section: enteredSection,
      parent1Name: enteredParent1Name,
      parent1Phone: enteredParent1Phone,
      parent2Name: enteredParent2Name,
      parent2Phone: enteredParent2Phone,
    };
    event.preventDefault();
    fetch(
      "https://student-monitoring.herokuapp.com/api/Student-Information",
      {
        method: "POST",
        body: JSON.stringify(studentData),
        headers: { "Content-Type": "application/json" },
      }
      
      )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Student Added successfully") {
          setSuccess(data.message);
          setError("");
        } else {
          setError(data.message);
          setSuccess("");}
        // alert(data.message);
        console.log(data);
        
        // setResponse(data.message);

      });


    // props.onAddStudent(studentData);
    // console.log(props.responses,"***********");
    // setError(props.x);
  }

 
    

  

  return (
    <>
    <DataEncoderCenterLayout><Card>
          <Card.Body>
            <h3 className="text-center mb-4">Add Student Detail</h3>

            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={submitHandler}>

           
            
              <Container>
              <Row>
                  <Col sm = {6}>
                  <Form.Group id="studentId">
                <Form.Label>Student ID</Form.Label>
                <Form.Control type="text" ref={studentId} size="sm" required />
              </Form.Group>
                  </Col>
                  
                </Row>
                <Row>
                  <Col sm = {6}>
                  <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" ref={firstName} size="sm" required />
              </Form.Group>
              <Form.Group id="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" ref={lastName} size="sm" required />
              </Form.Group>
              <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
                <Form.Control size="sm" as="select" ref={gradeRef} required>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </Form.Control>
              </Form.Group>
              <Form.Group id="section">
              <Form.Label>Section</Form.Label>
                <Form.Control size="sm" as="select" ref={sectionRef} required>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                </Form.Control>
              </Form.Group>
                  </Col>
                  <Col sm = {6}>
                  <Form.Group id="parentName1">
                <Form.Label>Parent Name</Form.Label>
                <Form.Control type="text" size="sm" ref={parent1NameRef} required />
              </Form.Group>
              <Form.Group id="parentPhone1">
                <Form.Label>Parent Phone</Form.Label>
                <Form.Control type="text" size="sm" ref={parent1PhoneRef} required />
              </Form.Group>
              <Form.Group id="parentName2">
                <Form.Label>Parent Name</Form.Label>
                <Form.Control type="text" size="sm" ref={parent2NameRef}  />
              </Form.Group>
              <Form.Group id="parentPhone2">
                <Form.Label>Parent Phone</Form.Label>
                <Form.Control type="text" size="sm" ref={parent2PhoneRef}  />
              </Form.Group>
                  </Col>
                </Row>
                <Form.Group id="id">
                
                     <Button disabled={loading} className="w-100" type="submit">
                Add Student
              </Button>
              </Form.Group>
              </Container>
              
              

              
             
            </Form>
          </Card.Body>
        </Card></DataEncoderCenterLayout>
    
     
        
        
      
    </>
  );
}

export default AddStudent;
