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

import { useState, useEffect } from "react";
import { useRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import AttendanceList from "../admin/AttendanceList";
import LayoutCenter from "../layout/LayoutCenter";
import Layout from "../layout/Layout";
function ViewAttendancePage({ title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error, setError] = useState();
  //   const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const subjectRef = useRef();
  const date = new Date();
  let x = { title };
  console.log(x);

  const currentDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const year = `${date.getFullYear()}`;
  const [startDate, setStartDate] = useState(new Date());
  function searchHandler() {
    // const enteredId = id.current.value;
    const term = termRef.current.value;
    const grade = gradeRef.current.value;
    const section = sectionRef.current.value;

    setIsLoading(true);
    fetch(
      // "https://student-monitoring.herokuapp.com
      "http://localhost:8080/api/filter-attendance/" +
        year +
        "/" +
        term +
        "/" +
        grade +
        "/" +
        section +
        "/" +
        startDate
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

        if (data.message == "No attendance record found")
          setError(data.message);
        else setError("");

        // console.log(loadedStudent[0]);
        // alert(data.message);
      });
  }
  useEffect(() => {}, []);

  if (isLoading) {
      if(x.title == 'admin'){
    return (
      <section>
        <Layout>
          <p>Loading...</p>
        </Layout>
      </section>
    );
      }
      else{
          return (
        <section>
          <DataEncoderCenterLayout>
            <p>Loading...</p>
          </DataEncoderCenterLayout>
        </section>
      );
        }
  }
  if (x.title == "admin") {
    return (
      <section>
        <Layout>
          <Container>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col sm={8}>
                <Row>
                  <Form.Group id="term" style={{ marginLeft: "30px" }}>
                    <Form.Label>Term</Form.Label>
                    <Form.Control size="sm" as="select" ref={termRef} required>
                      <option>first-term</option>
                      <option>sescond-term</option>
                      <option>third-term</option>
                      <option>fourth-term</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group id="grade" style={{ marginLeft: "30px" }}>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control size="sm" as="select" ref={gradeRef} required>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group id="section" style={{ marginLeft: "30px" }}>
                    <Form.Label>Section</Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      ref={sectionRef}
                      required
                    >
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group id="date" style={{ marginLeft: "30px" }}>
                    <Form.Label>Date</Form.Label>
                    <DatePicker
                      dateFormat={"dd/MM/yyyy"}
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Form.Group>

                  {/* <Col sm={4}>
              
          </Col> */}
                </Row>
              </Col>
              <Col sm={4}>
                <Button
                  style={{ marginTop: "20px" }}
                  className="w-100"
                  onClick={searchHandler}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
          <AttendanceList students={loadedStudent} />
        </Layout>
      </section>
    );
  } else {
    return(
    <section>
      <DataEncoderLayout>
        <Container>
          {error && <Alert variant="danger">{error}</Alert>}
          <Row>
            <Col sm={8}>
              <Row>
                <Form.Group id="term" style={{ marginLeft: "30px" }}>
                  <Form.Label>Term</Form.Label>
                  <Form.Control size="sm" as="select" ref={termRef} required>
                    <option>first-term</option>
                    <option>sescond-term</option>
                    <option>third-term</option>
                    <option>fourth-term</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group id="grade" style={{ marginLeft: "30px" }}>
                  <Form.Label>Grade</Form.Label>
                  <Form.Control size="sm" as="select" ref={gradeRef} required>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group id="section" style={{ marginLeft: "30px" }}>
                  <Form.Label>Section</Form.Label>
                  <Form.Control size="sm" as="select" ref={sectionRef} required>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group id="date" style={{ marginLeft: "30px" }}>
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    dateFormat={"dd/MM/yyyy"}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Form.Group>

                {/* <Col sm={4}>
              
          </Col> */}
              </Row>
            </Col>
            <Col sm={4}>
              <Button
                style={{ marginTop: "20px" }}
                className="w-100"
                onClick={searchHandler}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Container>
        <AttendanceList students={loadedStudent} />
      </DataEncoderLayout>
    </section>);
  }
}

export default ViewAttendancePage;