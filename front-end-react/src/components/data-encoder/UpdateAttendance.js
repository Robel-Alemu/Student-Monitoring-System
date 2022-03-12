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
  const token = localStorage.getItem("token")


  const studentIdRef = useRef();
  const studentNameRef = useRef();
  // const yearRef = useRef();
  // const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();

  const statusRef = useRef();
  const dateRef = useRef();
 
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  
  // const [term, setTerm] = useState(["Select Term"])
  const [sections,setSections]=useState(["Select Section"]);
  const [classes,setClasses] = useState(["Select Grade"]);
  const terms = ["first-term", "second-term", "third-term", "fourth-term"];

  const history = useHistory();


  


  function submitHandler(event) {
    event.preventDefault();
    const enteredStudentId = studentIdRef.current.value;
    const enteredStudentName = studentNameRef.current.value;
    // const enteredYear = yearRef.current.value;
    // const enteredTerm = termRef.current.value;
    const enteredGrade = gradeRef.current.value;
    const enteredSection = sectionRef.current.value;
    const enteredStatus = statusRef.current.value;
    const enteredDate = dateRef.current.value;
    

    const attendanceData = {
      studentId: enteredStudentId,
      studentName: enteredStudentName,
     
      // term: enteredTerm,
      grade: enteredGrade,
      section: enteredSection,
      status: enteredStatus,
      date: enteredDate
      
    };

    //   props.onUpdateStudent(studentData);
    fetch("http://localhost:8080/api/update-attendance/" + enteredStudentId, {
      method: "PUT",
      body: JSON.stringify(attendanceData),
      headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {

        // alert(data.message);
        // console.log(data);
        
           
            if (data.message == "Attendance Updated successfuly") {setSuccess(data.message);
                setError("");
                setTimeout(() => {  setSuccess(""); }, 2000);}
        
                else {setError(data.message);
                        setSuccess("");
                        setTimeout(() => {  setError(""); }, 2000);}
                  
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
        
              </Col>
              <Col sm = {4}>
            
            {/* <Form.Group id="term">
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
                  */}
                 
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
              <Button className="w-100" type="submit" style={{marginTop:"28px"}} variant="success">
              <svg style={{marginRight:"7px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg> Update 
                  </Button>
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
            
                  </Col>
                </Row>
           

         

            

            
          </Form>
        </Card.Body>
      </Card>
      
    </>
  );
}

export default UpdateAttendance;
