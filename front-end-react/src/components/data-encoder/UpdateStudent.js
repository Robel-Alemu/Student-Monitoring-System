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

  const studentId = useRef();
  const firstName = useRef();
  const lastName = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();

  const parent1NameRef = useRef();
  const parent1PhoneRef = useRef();
  const parent2NameRef = useRef();
  const parent2PhoneRef = useRef();
  const [error, setError] = useState("");

  const history = useHistory();

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
    };

    //   props.onUpdateStudent(studentData);
    fetch("http://localhost:8080/api/update-student/" + enteredStudentId, {
      method: "PUT",
      body: JSON.stringify(studentData),
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
  }

  function deleteHandler(event) {
    event.preventDefault();
    const id = studentId.current.value;

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
      <Card style={{marginTop:"30px"}}>
        <Card.Body>
          <h3 className="text-center mb-4">Update Student Detail</h3>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
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
                size="sm"
                as="select"
                ref={gradeRef}
                required
                defaultValue={props.grade}
              >
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
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
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </Form.Control>
            </Form.Group>

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

            <Container>
              {/* <Row> */}
              <Row>
                <Col md={4}>
                  <Button className="w-100" type="submit">
                    Update
                  </Button>
                </Col>
                <Col md={{ span: 4, offset: 4 }}>
                  <Button variant="danger" onClick={deleteHandler}>
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
