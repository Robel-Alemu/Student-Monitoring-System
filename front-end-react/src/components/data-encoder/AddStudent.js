import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import Login from "../authentication/Login";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

function AddStudent(props) {
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

  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [sections,setSections]=useState(["Select Section"]);
  const [grades,setGrades] = useState(["Select Grade"]);
  const history = useHistory();
  const [fieldIsVisible, setFieldIsVisible] = useState(true);
  const [field, setField] = useState();

  let userRole = localStorage.getItem("role")

  // const [parent,setParent] = useState();
  // const [parentPhones,setParentPhones] = useState()
  function gradeChangeHandler(e) {
    e.preventDefault();


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
        setSections(classArray[0].section)
        console.log(classArray[0].section);
        console.log(sections,"*********");
        sections.forEach(element => {
          console.log(element)
        });
        
        // setResponse(data.message);

      });


    if (gradeRef.current.value == 11 || gradeRef.current.value == 12)
      setFieldIsVisible(false);
    else setFieldIsVisible(true);
  }

  function fieldHandler(e) {
    e.preventDefault();
    if (gradeRef.current.value == 9 || gradeRef.current.value == 10)
      setField("normal");
    else setField(fieldRef.current.value.toString());
    console.log(field, "------------");
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
      const numberGrade = []
      gradesArray.forEach(x=>{
        numberGrade.push(parseInt(x))
      })
    numberGrade.sort(function(a, b) {
      return a - b;
    });
    console.log(numberGrade)
      // setClasses(numberGrade)
      setGrades(numberGrade)
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
    setSections(classArray[0].section)
    console.log(classArray[0].section);
    console.log(sections,"*********");
    sections.forEach(element => {
      console.log(element)
    });
    
    // setResponse(data.message);

  });


if (gradeRef.current.value == 11 || gradeRef.current.value == 12)
  setFieldIsVisible(false);
else setFieldIsVisible(true);

}




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
const parent = [];
const parentPhone = [];
if(enteredParent1Name && enteredParent1Phone && enteredParent2Name && enteredParent2Phone ){
  
  parent.push({
    parentName: enteredParent1Name,
    parentPhone : enteredParent1Phone
  },{
    parentName: enteredParent2Name,
    parentPhone : enteredParent2Phone
  })
  parentPhone.push(enteredParent1Phone,enteredParent2Phone)
  
  // const parent=[
  //   {
  //     parentName: enteredParent1Name,
  //     parentPhone : enteredParent1Phone
  //   },
  //   {
  //     parentName: enteredParent2Name,
  //     parentPhone : enteredParent2Phone
  //   }
  // ]
  // const pPhones = [enteredParent1Phone,enteredParent2Phone]
  // setParentPhones(pPhones);
  // setParent(parent);
  
}
else if(enteredParent1Name && enteredParent1Phone ){
  // const parent=[
  //   {
  //     parentName: enteredParent1Name,
  //     parentPhone : enteredParent1Phone
  //   }]
  //   const pPhones = [enteredParent1Phone]
  //   setParent(parent);
    
  //   setParentPhones(pPhones);
  parent.push({
    parentName: enteredParent1Name,
    parentPhone : enteredParent1Phone
  })
  parentPhone.push(enteredParent1Phone)
  
}
// else if(enteredParent2Name && enteredParent2Phone ){
//   const parent=[
//     {
//       parentName: enteredParent2Name,
//       parentPhone : enteredParent2Phone
//     }]
//     const pPhones = [enteredParent2Phone]
//     setParent(parent);
    
//     setParentPhones(pPhones);
// }

    const studentData = {
      studentId: enteredStudentId,
      firstName: enteredFirstName,
      lastName: enteredLastName,
      grade: enteredGrade,
      section: enteredSection,
      // parent1Name: enteredParent1Name,
      // parent1Phone: enteredParent1Phone,
      // parent2Name: enteredParent2Name,
      // parent2Phone: enteredParent2Phone,
      parentPhones: parentPhone,
      field: field,
    };


    const FinaStudentData = [studentData, parent];



    console.log(field);
    event.preventDefault();
    fetch(
      "http://localhost:8080/api/Student-Information",
      // "https://student-monitoring.herokuapp.com/api/Student-Information",
      {
        method: "POST",
        body: JSON.stringify(FinaStudentData),
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
          setSuccess("");
        }
        // alert(data.message);

        
        console.log(data);

        // setResponse(data.message);
      });

    // props.onAddStudent(studentData);
    // console.log(props.responses,"***********");
    // setError(props.x);
  }
  if (userRole == "Data Encoder"){
  return (
    <>
      <DataEncoderCenterLayout>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">Add Student and Parent</h3>

            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={submitHandler} onLoad={gradeHandler}>
              <Container>
                <Row>
                  <Col sm={6}>
                    <Form.Group id="studentId">
                      <Form.Label>Student ID</Form.Label>
                      <Form.Control
                        type="text"
                        ref={studentId}
                        size="sm"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group id="field">
                      <Form.Label>Field</Form.Label>
                      <Form.Control
                        size="sm"
                        as="select"
                        onChange={fieldHandler}
                        disabled={fieldIsVisible}
                        ref={fieldRef}
                        required
                      >
                        <option>Natural Science</option>
                        <option>Social Science</option>
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <Form.Group id="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        ref={firstName}
                        size="sm"
                        required
                      />
                    </Form.Group>
                    <Form.Group id="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        ref={lastName}
                        size="sm"
                        required
                      />
                    </Form.Group>
                    <Form.Group id="grade">
                      <Form.Label>Grade</Form.Label>
                      <Form.Control
                        size="sm"
                        as="select"
                        // onChange={gradeChangeHandler}
                        ref={gradeRef}
                        required
                        onClick={gradeHandler}
                      >
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
                        placeholder="choose section"
                      >
                        {sections.map(item => {
      return (<option  >{item}</option>);
  })}
                      
                      </Form.Control>


 
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group id="parentName1">
                      <Form.Label>Parent Name</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        ref={parent1NameRef}
                        required
                      />
                    </Form.Group>
                    <Form.Group id="parentPhone1">
                      <Form.Label>Parent Phone</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        ref={parent1PhoneRef}
                        required
                      />
                    </Form.Group>
                    <Form.Group id="parentName2">
                      <Form.Label>Parent Name</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        ref={parent2NameRef}
                      />
                    </Form.Group>
                    <Form.Group id="parentPhone2">
                      <Form.Label>Parent Phone</Form.Label>
                      <Form.Control
                        type="text"
                        size="sm"
                        ref={parent2PhoneRef}
                      />
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
        </Card>
      </DataEncoderCenterLayout>
    </>
  );
}
else {
  return(
    <Login/>
  )
}
}

export default AddStudent;
