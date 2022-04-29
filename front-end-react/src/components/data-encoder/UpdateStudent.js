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
import DataEncoderLayout from "../layout/DataEncoderLayout";

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
  const token = localStorage.getItem("token")
  //     const {getStudent} = useAuth();

  // const id = useRef();
  // const enteredId = id.current.value;
  const subjects = [
    "Amharic",
    "English",
    "Maths",
    "Physics",
    "Biology",
    "Chemistry",
    "Civics",
    "Physical Education",
    "IT",
    "Geography",
    "History",
    "Economics",
  ];
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
  const [sections, setSections] = useState([props.section]);
  const [grades, setGrades] = useState([props.grade]);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const history = useHistory();

  const [fieldIsVisible, setFieldIsVisible] = useState(false);
  const [field, setField] = useState();
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

  function gradeHandler(e) {
    e.preventDefault();
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
          classArray.push(classData);
        }
        // alert(data.message);
        const gradesArray = [];
        classArray.forEach((x) => {
          console.log(x);
          gradesArray.push(x.class_);
        });
        const numberGrade = [];
        gradesArray.forEach((x) => {
          numberGrade.push(parseInt(x));
        });
        numberGrade.sort(function (a, b) {
          return a - b;
        });
        console.log(numberGrade);
        // setClasses(numberGrade)
        setGrades(numberGrade);
        console.log(grades);
        console.log(grades, "****Grades*****");
        grades.forEach((element) => {
          console.log(element);
        });
      });

    fetch(
      "http://localhost:8080/api/get-class/" + gradeRef.current.value
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
          classArray.push(classData);
        }
        // alert(data.message);
        console.log(sections, "before******************");
        setSections(classArray[0].section);
        console.log(classArray[0].section);
        console.log(sections, "*********");
        sections.forEach((element) => {
          console.log(element);
        });

        // setResponse(data.message);
      });
  }

  function fieldHandler(e) {
    e.preventDefault();
    if (gradeRef.current.value == 9 || gradeRef.current.value == 10)
      setField("normal");
    else setField(fieldRef.current.value.toString());
    console.log(field, "------------");
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

    // const studentData = {
    //   studentId: enteredStudentId,
    //   firstName: enteredFirstName,
    //   lastName: enteredLastName,
    //   grade: enteredGrade,
    //   section: enteredSection,
    //   parent1Name: enteredParent1Name,
    //   parent1Phone: enteredParent1Phone,
    //   parent2Name: enteredParent2Name,
    //   parent2Phone: enteredParent2Phone,
    //   field : field
    // };
    const parent = [];
    const parentPhone = [];
    if (
      enteredParent1Name &&
      enteredParent1Phone &&
      enteredParent2Name &&
      enteredParent2Phone
    ) {
      parent.push(
        {
          parentName: enteredParent1Name,
          parentPhone: enteredParent1Phone,
        },
        {
          parentName: enteredParent2Name,
          parentPhone: enteredParent2Phone,
        }
      );
      parentPhone.push(enteredParent1Phone, enteredParent2Phone);

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
    } else if (enteredParent1Name && enteredParent1Phone) {
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
        parentPhone: enteredParent1Phone,
      });
      parentPhone.push(enteredParent1Phone);
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

    //   props.onUpdateStudent(studentData);
    fetch("http://localhost:8080/api/update-student/" + enteredStudentId, {
      method: "PUT",
      body: JSON.stringify(FinaStudentData),
      headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // alert(data.message);
        console.log(data);
        if (data.message == "Student Updated successfuly") {
          setSuccess(data.message);
          setError("");
          setTimeout(() => {  setSuccess(""); }, 2000);
        } else {
          setError(data.message);
          setSuccess("");
          setTimeout(() => {  setError(""); }, 2000);
        }

        //   setResponse(data);
      });
  }

  function deleteHandler(event) {
    event.preventDefault();
    if (window.confirm("Are you sure?")) {
      const id = studentId.current.value;

      fetch("http://localhost:8080/api/delete-student/" + id, {
        // "https://student-monitoring.herokuapp.com/api/delete-student/" + id, {
        method: "DELETE",
        //   body: JSON.stringify(studentData),
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
      })
        .then((response) => {
          // console.log(response);
          return response.json();
        })
        .then((data) => {
          // alert(data.message);
          console.log(data);
          if (data.message == "Student Deleted successfuly") {
            setSuccess(data.message);
            setError("");
            setTimeout(() => {  setSuccess(""); }, 2000);
          } else {
            setError(data.message);
            setSuccess("");
            setTimeout(() => {  setError(""); }, 2000);
          }
          //   setResponse(data);
        });
    }
    // props.onEdit(editMessage);
    history.push("/update-student");
  }

  return (
    <>
    
      <Card style={{ marginTop: "30px" }}>
        <Card.Body>
          {/* <h3 className="text-center mb-4">Update Student Detail</h3> */}

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={submitHandler}>
            <Container>
              <Row>
                <Col sm={6}>
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
                      defaultValue={props.field}
                    >
                      <option>Natural Science</option>
                      <option>Social Science</option>
                      <option>Normal</option>
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
                      {grades.map((item) => {
                        return <option>{item}</option>;
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
                      {sections.map((item) => {
                        return <option>{item}</option>;
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
                    <svg
                      style={{ marginRight: "7px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-check-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z" />
                    </svg>{" "}
                    Update
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button
                    className="w-100"
                    variant="danger"
                    onClick={deleteHandler}
                  >
                    <svg
                      style={{ marginRight: "7px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-person-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      <path
                        fill-rule="evenodd"
                        d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                      />
                    </svg>{" "}
                    Delete
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

export default UpdateStudent;
