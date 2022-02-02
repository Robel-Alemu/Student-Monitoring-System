import {
  Form,
  Button,
  Card,
  FormControl,
  Alert,
  Container,
  Row,
  Col,
  Spinner
} from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";
// import StudentList from "../data-encoder/StudentList";
import StudentList from "../admin/StudentList";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import Adminavigation from "../admin/AdminNavigation";
import LayoutCenter from "../layout/LayoutCenter";
import GradesList from "../admin/GradesList";
import Layout from "../layout/Layout";
function ViewGradePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError] = useState();
  //   const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const subjectRef = useRef();

  function searchHandler() {
    // const enteredId = id.current.value;
    const term = termRef.current.value;
    const grade = gradeRef.current.value;
    const section = sectionRef.current.value;
    const subject = subjectRef.current.value;
    setIsLoading(true);
    fetch(
      // "https://student-monitoring.herokuapp.com
      "http://localhost:8080/api/filter-grades/" +
        term +
        "/" +
        grade +
        "/" +
        section +
        "/" +
        subject
    )
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const student = [];

        for (const key in data) {
          const studentData = {
            id: key,
            ...data[key],
          };
          student.push(studentData);
          //   alert(data.message);
        }
        setIsLoading(false);
        setLoadedStudent(student);
        
          
        if (data.message == "No student record found") setError(data.message);
        else setError("");
                
        // console.log(loadedStudent[0]);
        // alert(data.message);
      });
  }
  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <section>
        <LayoutCenter>
          {/* <p>Loading...</p> */}
          <>
  <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...please wait</span>
  
  </Button>
</>
        </LayoutCenter>
      </section>
    );
  }

  return (
    <section>
      {/* <DataEncoderLayout><Container>
  <Row>
    <Col sm={8}><h1>Student</h1></Col>
    <Col sm={4}>
     
    <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginBottom:"30px"}}/>
    <Button  className="w-100" onClick = {searchHandler}>
                Search
              </Button>
 </Col>
  </Row>
</Container> */}
      <Layout>
        <Container style={{marginBottom:"30px"}}>
          <Row>
            <Col sm={8}>
              <h1>View Grade</h1>
              {error && <Alert variant="danger">{error}</Alert>}
            </Col>
          </Row>

          <Row></Row>
          <Row >
            <Form.Group id="term">
              <Form.Label>Term</Form.Label>
              <Form.Control size="sm" as="select" ref={termRef} required>
                <option>first-term</option>
                <option>sescond-term</option>
                <option>third-term</option>
                <option>fourth-term</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="grade" style={{marginLeft:"30px"}}>
              <Form.Label>Grade</Form.Label>
              <Form.Control size="sm" as="select" ref={gradeRef} required>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="section" style={{marginLeft:"30px"}}>
              <Form.Label>Section</Form.Label>
              <Form.Control size="sm" as="select" ref={sectionRef} required>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="subject" style={{marginLeft:"30px"}}>
              <Form.Label>Subject</Form.Label>
              <Form.Control size="sm" as="select" ref={subjectRef} required>
                <option>Maths</option>
                <option>physics</option>
                <option>english</option>
                <option>amharic</option>
              </Form.Control>
            </Form.Group>

            </Row>
            <Row >   <Button className="w-25" onClick={searchHandler}>
                Search
              </Button>
           </Row>
          
          

          {/* <Row><Col sm={4}>
     
   
     <Button  className="w-50" onClick = {searchHandler}>
                 Search
               </Button>
  </Col></Row> */}
        </Container>
        <GradesList students={loadedStudent} />
     
        {/* </DataEncoderLayout> */}
      </Layout>
    </section>
  );
}

export default ViewGradePage;
