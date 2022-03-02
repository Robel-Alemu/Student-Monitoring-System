import React, { useRef, useState, useEffect } from "react";
import {
  Form,
  Button,
  Card,
  FormControl,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";

function EditGrade(props) {

  const [loading, setLoading] = useState(true);
  const [loade, setLoaded] = useState([]);

  //     const {getStudent} = useAuth();

  // const id = useRef();
  // const enteredId = id.current.value;

  const studentId = useRef();
  const studentNameRef = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();

  const subjectRef = useRef();
  const firstTestRef = useRef();
  const secondTestRef = useRef();
  const assessementsRef = useRef();
  const finalRef = useRef();
  
  const [error,setError] = useState();
  const [success,setSuccess] = useState();
  const history = useHistory();


  function submitHandler(event) {
    event.preventDefault();
    const enteredStudentId = studentId.current.value;
    const studentName = studentNameRef.current.value;
    const term = termRef.current.value;
    const grade = gradeRef.current.value;
    const section = sectionRef.current.value;
    const subject = subjectRef.current.value;
    const firstTest = firstTestRef.current.value;
    const secondTest = secondTestRef.current.value;
    const assessements = assessementsRef.current.value;
    const final = finalRef.current.value;
   
    const studentData = {
      studentId: enteredStudentId,
      studentName: studentName,
      term: term,
      grade: grade,
      section: section,
      subject: subject,
      firstTest: firstTest,
      secondTest: secondTest,
      assessements: assessements,
      final : final
    };

    //   props.onUpdateStudent(studentData);
    fetch(
      "http://localhost:8080/api/edit-grade/" + term + "/" + grade + "/" + section + "/" + subject + "/" + enteredStudentId, {
      method: "PUT",
      body: JSON.stringify(studentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        console.log(data);
        if (data.message == "Student Grade Updated successfuly") {setSuccess(data.message);
          setError("");}
  
          else {setError(data.message);
                  setSuccess("");}

        //   setResponse(data);
      });
  }



  // function onLoadHandler(e){e.preventDefault()
  
  // document.getElementById("gradeSelect").value="choose grade"}

 

  return (
    <>
    <Card style={{marginTop:"30px"}}>
        <Card.Body>
          {/* <h3 className="text-center mb-4">Update Student Detail</h3> */}

          {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
          <Form  onSubmit={submitHandler}>

            <Container>
              <Row>
            <Col sm = {6}>
      <Form.Group id="studentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                disabled={true}
                type="text"
                ref={studentId}
                size="sm"
                required
                defaultValue={props.studentId}
              />
            </Form.Group>
            
            </Col>
            <Col sm = {6}>
            <Form.Group id="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                disabled="true"
                ref={subjectRef}
                required
                defaultValue={props.subject}
              />
            </Form.Group>

                  </Col>
            </Row>
    <Row>
     <Col sm = {6}>
            <Form.Group id="studentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                ref={studentNameRef}
                size="sm"
                disabled="true"
                required
                defaultValue={props.studentName}
              />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Term</Form.Label>
              <Form.Control
                type="text"
                ref={termRef}
                size="sm"
                disabled="true"
                required
                defaultValue={props.term}
              />
            </Form.Group>
      
   
      <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
              ref={gradeRef}
              type="text"
              size="sm"
              disabled="true"
                required
                defaultValue={props.grade}
             id="greadeSelect"
              >
               
                
               
              </Form.Control>
            </Form.Group>
            <Form.Group id="section">
              <Form.Label>Section</Form.Label>
              <Form.Control
              
                size="sm"
                type="text"
                ref={sectionRef}
                required
                disabled="true"
                defaultValue={props.section}
              >
               

              </Form.Control>
            </Form.Group>
      </Col>

      <Col sm = {6}>
      
            <Form.Group id="firstTest">
              <Form.Label>First Test</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={firstTestRef}
                required
                defaultValue={props.firstTest}
              />
            </Form.Group>
            <Form.Group id="secondTest">
              <Form.Label>Second Test</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={secondTestRef}
                defaultValue={props.secondTest}
              />
            </Form.Group>
            <Form.Group id="assessements">
              <Form.Label>Assessements</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={assessementsRef}
                defaultValue={props.assessements}
              />
               </Form.Group>
              <Form.Group id="final">
              <Form.Label>Final</Form.Label>
              <Form.Control
                type="text"
                ref={finalRef}
                size="sm"
                required
                defaultValue={props.final}
              />
           
            </Form.Group>
        </Col>
     
    </Row>

            </Container>
            
           

           

            <Container>
              {/* <Row> */}
              <Row>
                <Col sm={6}>
                  <Button className="w-100" variant="success" type="submit" style={{marginLeft:"50%", marginTop:"25px"} }>
                    Update
                  </Button>
                </Col>
                
              </Row>
            
            </Container>

           
          </Form>
        </Card.Body>
      </Card>
      
    </>
  );
}

export default EditGrade;
