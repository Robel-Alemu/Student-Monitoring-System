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
import CommonLayout from "../layout/CommonLayout";

function UpdateAttendance(props) {
  //     const [sId, setSId] = useState("");
  //     const [fName, setFName] = useState("");
  //     const [lName, setLName] = useState("");
  //     const [grade, setGrade] = useState("");
  //     const [section, setSection] = useState("");
  //     const [p1Name, setP1Name] = useState("");
  //     const [p1Phone, setP1Phone] = useState("");

  //     const [p2Name, setP2Name] = useState("");
  //     const [p2Phone, setP2Phone] = useState("");

  const [loading, setLoading] = useState(true);
  const [loade, setLoaded] = useState([]);

  //     const {getStudent} = useAuth();

  // const id = useRef();
  // const enteredId = id.current.value;



  const studentIdRef = useRef();
  const studentNameRef = useRef();
  const yearRef = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();

  const statusRef = useRef();
  const dateRef = useRef();
 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const history = useHistory();

  function submitHandler(event) {
    event.preventDefault();
    const enteredStudentId = studentIdRef.current.value;
    const enteredStudentName = studentNameRef.current.value;
    // const enteredYear = yearRef.current.value;
    const enteredTerm = termRef.current.value;
    const enteredGrade = gradeRef.current.value;
    const enteredSection = sectionRef.current.value;
    const enteredStatus = statusRef.current.value;
    const enteredDate = dateRef.current.value;
    

    const attendanceData = {
      studentId: enteredStudentId,
      studentName: enteredStudentName,
      // year: enteredYear,
      term: enteredTerm,
      grade: enteredGrade,
      section: enteredSection,
      status: enteredStatus,
      date: enteredDate
      
    };

    //   props.onUpdateStudent(studentData);
    fetch("http://localhost:8080/api/update-attendance/" + enteredStudentId, {
      method: "PUT",
      body: JSON.stringify(attendanceData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {

        // alert(data.message);
        // console.log(data);
        
           
            if (data.message == "Attendance Updated successfuly") {setSuccess(data.message);
                setError("");}
        
                else {setError(data.message);
                        setSuccess("");}

        //   setResponse(data);
      });
  }

  function deleteHandler(event) {
    event.preventDefault();
    const id = studentIdRef.current.value;

    fetch("https://student-monitoring.herokuapp.com/api/delete-student/" + id, {
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

        //   setResponse(data);
      });

    // props.onEdit(editMessage);
    history.push("/update-student");
  }

  return (
    <>
   
      <Card style={{marginTop:"30px"} , {innerWidth:"60%"}} >
        <Card.Body>
          <h3 className="text-center mb-4">Update Student Attendance</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={submitHandler}>

          <Row>
                  <Col sm = {4}>
                  <Form.Group id="studentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                disabled={true}
                type="text"
                ref={studentIdRef}
                size="sm"
                required
                defaultValue={props.studentId}
              />
            </Form.Group>
            <Form.Group id="studentName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                disabled={true}
                ref={studentNameRef}
                size="sm"
                required
                defaultValue={props.studentName}
              />
            </Form.Group>
            {/* <Form.Group id="year">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="text"
                ref={yearRef}
                disabled={true}
                size="sm"
                required
                defaultValue={props.year}
              />
</Form.Group> */}
              </Col>
              <Col sm = {4}>
            
            <Form.Group id="term">
              <Form.Label>Term</Form.Label>
              <Form.Control
                type="text"
                ref={termRef}
                disabled={true}
                size="sm"
                required
                defaultValue={props.term}
              />
            </Form.Group>
                 
                 
                  <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                disabled={true}
                ref={gradeRef}
                required
                defaultValue={props.grade}
              />
            </Form.Group>
            <Form.Group id="section">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={sectionRef}
                disabled={true}
                required
                defaultValue={props.section}
              /> </Form.Group>
               </Col>
               <Col sm = {4}>
           
            
              
            <Form.Group id="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                disabled={true}
                ref={dateRef}
                defaultValue={props.date}
              />
            </Form.Group>
            <Form.Group id="status">
                <Form.Label>Status</Form.Label>
                <Form.Control size="sm" as="select" ref={statusRef} required defaultValue={props.status}>
                  <option>P</option>
                  <option>A</option>
                  <option>Permission</option>
                  
                </Form.Control>
                </Form.Group>
            <Button className="w-100" type="submit" style={{marginTop:"28px"}} variant="success">
                    Update
                  </Button>
                  </Col>
                </Row>
           

         

            

            {/* <Button  className="w-100" type="submit">
              Update
              </Button> */}
            {/* <Button variant="primary" onClick={deleteHandler}>Delette</Button > */}
          </Form>
        </Card.Body>
      </Card>
      
    </>
  );
}

export default UpdateAttendance;
