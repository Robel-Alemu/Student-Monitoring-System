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

function UpdateStudent(props) {
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
const subjects = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "Physical Education", "IT", "Geography", "History", "Economics" ];
  const studentId = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const fieldRef = useRef();
  const parent1NameRef = useRef();
  const parent1PhoneRef = useRef();
  const parent2NameRef = useRef();
  const parent2PhoneRef = useRef();
  const [sections,setSections]=useState([props.section]);
  const [grades,setGrades] = useState([props.grade]);
  const [error,setError] = useState();
  const [success,setSuccess] = useState();
  const history = useHistory();

  const [fieldIsVisible,setFieldIsVisible]= useState(false);
  const [field,setField]= useState();
// function gradeChangeHandler(e){
// e.preventDefault();
// if (gradeRef.current.value == 11 || gradeRef.current.value == 12 )
// setFieldIsVisible(false)
// else (setFieldIsVisible(true))



// }


function gradeChangeHandler(e) {
  e.preventDefault();


  if (gradeRef.current.value == 11 || gradeRef.current.value == 12)
    setFieldIsVisible(false);
  else setFieldIsVisible(true);
}

function gradeHandler(e){
  e.preventDefault()
  fetch(
    "http://localhost:8080/api/get-all-class"
    // "https://student-monitoring.herokuapp.com/api/Student-Information",
   
    
    )
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      const classArray = [];

      for (const key in data) {
        const classData = {
          id: key,
          ...data[key],
        };
        classArray.push(classData);}
      // alert(data.message);
     const gradesArray = []
      classArray.forEach(x=>{
        console.log(x);
        gradesArray.push(x.class_)

      })
      setGrades(gradesArray)
      console.log(grades);
      console.log(grades,"****Grades*****");
      grades.forEach(element => {
        console.log(element)
      });

})

fetch(
  "http://localhost:8080/api/get-class/"+gradeRef.current.value
  // "https://student-monitoring.herokuapp.com/api/Student-Information",
 
  
  )
  .then((response) => {
    // console.log(response);
    return response.json();
  })
  .then((data) => {
    const classArray = [];

    for (const key in data) {
      const classData = {
        id: key,
        ...data[key],
      };
      classArray.push(classData);}
    // alert(data.message);
    console.log(sections,"before******************")
    setSections(classArray[0].section)
    console.log(classArray[0].section);
    console.log(sections,"*********");
    sections.forEach(element => {
      console.log(element)
    });
    
    // setResponse(data.message);

  });
}



function fieldHandler(e){
  e.preventDefault()
  if (gradeRef.current.value == 9 || gradeRef.current.value == 10) setField("normal")
  else setField((fieldRef.current.value).toString())
    console.log(field,"------------")
}

  function submitHandler(event) {
    event.preventDefault();
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
      studentId: enteredStudentId,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      grade: enteredGrade,
      section: enteredSection,
      parent1Name: enteredParent1Name,
      parent1Phone: enteredParent1Phone,
      parent2Name: enteredParent2Name,
      parent2Phone: enteredParent2Phone,
      field : field
    };

    //   props.onUpdateStudent(studentData);
    fetch(
      "http://localhost:8080/api/update-student/" + enteredStudentId, {
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
        if (data.message == "Student Updated successfuly") {setSuccess(data.message);
          setError("");}
  
          else {setError(data.message);
                  setSuccess("");}

        //   setResponse(data);
      });
  }



  function onLoadHandler(e){e.preventDefault()
  
  document.getElementById("gradeSelect").value="choose grade"}

  function deleteHandler(event) {
    event.preventDefault();
    const id = studentId.current.value;

    fetch(
      "https://student-monitoring.herokuapp.com/api/delete-student/" + id, {
      method: "DELETE",
      //   body: JSON.stringify(studentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        console.log(data);
        if (data.message == "Student Deleted successfuly") {setSuccess(data.message);
          setError("");}
  
          else {setError(data.message);
                  setSuccess("");}
        //   setResponse(data);
      });

    // props.onEdit(editMessage);
    history.push("/update-student");
  }

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
                  <Form.Group id="field">
              <Form.Label>Field</Form.Label>
                <Form.Control size="sm" as="select" onChange={fieldHandler}  disabled={fieldIsVisible} ref={fieldRef} required defaultValue={props.field}>
                  <option>Natural Science</option>
                  <option>Social Science</option>
                  <option>Normal</option>
                </Form.Control>
              </Form.Group>

                  </Col>
            </Row>
    <Row>
     <Col sm = {6}>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                ref={firstName}
                size="sm"
                required
                defaultValue={props.firstName}
              />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                ref={lastName}
                size="sm"
                required
                defaultValue={props.lastName}
              />
            </Form.Group>
      
   
      <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
              <Form.Control
              
              onChange={gradeChangeHandler}
              onClick={gradeHandler}
                size="sm"
                as="select"
                ref={gradeRef}
                required
                defaultValue={props.grade}
             id="greadeSelect"
              >
                {/* <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option> */}
                
                {grades.map(item => {
      return (<option  >{item}</option>);
  })}
              </Form.Control>
            </Form.Group>
            <Form.Group id="section">
              <Form.Label>Section</Form.Label>
              <Form.Control
              
                size="sm"
                as="select"
                ref={sectionRef}
                required
                defaultValue={props.section}
              >
                {/* <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option> */}

{sections.map(item => {
      return (<option  >{item}</option>);
  })}
              </Form.Control>
            </Form.Group>
      </Col>

      <Col sm = {6}>
      <Form.Group id="parentName1">
              <Form.Label>Parent Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={parent1NameRef}
                required
                defaultValue={props.parent1N}
              />
            </Form.Group>
            <Form.Group id="parentPhone1">
              <Form.Label>Parent Phone</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={parent1PhoneRef}
                required
                defaultValue={props.parent1P}
              />
            </Form.Group>
            <Form.Group id="parentName2">
              <Form.Label>Parent Name</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={parent2NameRef}
                defaultValue={props.parent2N}
              />
            </Form.Group>
            <Form.Group id="parentPhone2">
              <Form.Label>Parent Phone</Form.Label>
              <Form.Control
                type="text"
                size="sm"
                ref={parent2PhoneRef}
                defaultValue={props.parent2P}
              />
            </Form.Group>
        </Col>
     
    </Row>

            </Container>
            
           

           

            <Container>
              {/* <Row> */}
              <Row>
                <Col sm={6}>
                  <Button className="w-100" variant="success" type="submit">
                    Update
                  </Button>
                </Col>
                <Col sm ={6}>
                  <Button  className="w-100" variant="danger" onClick={deleteHandler}>
                    Delete
                  </Button>
                </Col>
              </Row>
              {/* <Col sm={3}><Button  className="w-100" type="submit">
              Update
              </Button></Col>
    <Col sm={3}>
     
    <Button variant="primary" onClick={deleteHandler}>Delette</Button >
 </Col>
  </Row> */}
            </Container>

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

export default UpdateStudent;
