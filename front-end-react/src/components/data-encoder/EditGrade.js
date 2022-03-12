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
import Login from "../authentication/Login";
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
  let userRole = localStorage.getItem("role")
  const token = localStorage.getItem("token")
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
    let userRole = localStorage.getItem("role")
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
      headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        console.log(data);
        if (data.message == "Student Grade Updated successfuly") {setSuccess(data.message);
          setError("");
          setTimeout(() => {  setSuccess(""); }, 2000);}
  
          else {setError(data.message);
                  setSuccess("");
                  setTimeout(() => {  setError(""); }, 2000);}

        //   setResponse(data);
      });
  }



  // function onLoadHandler(e){e.preventDefault()
  
  // document.getElementById("gradeSelect").value="choose grade"}

 
  if (userRole == "Data Encoder"){
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
            <Form.Group id="term">
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
                  <svg style={{marginRight:"7px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>  Update 
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
  else {
    return(
      <Login/>
    )
  }
}

export default EditGrade;
