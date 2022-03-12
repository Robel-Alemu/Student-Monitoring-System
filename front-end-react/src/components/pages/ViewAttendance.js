import {
  Form,
  Button,
  Card,
  FormControl,
  Alert,
  Container,
  Row,
  Col,
  Spinner,
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

import { useAuth } from "../../AuthContext/AuthContext";
import Login from "../authentication/Login";

function ViewAttendancePage({ title }) {
  const { currentUser, getUser } = useAuth();
 
  const token = localStorage.getItem("token")
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error, setError] = useState();
  //   const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const subjectRef = useRef();

  const [term, setTerm] = useState(["Select Term"]);
  const [sections, setSections] = useState(["Select Section"]);
  const [classes, setClasses] = useState(["Select Grade"]);
  // const terms = ["first-term", "second-term", "third-term", "fourth-term"];

  const date = new Date();
  let x = { title };
  console.log(x);

  const currentDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  // const year = `${date.getFullYear()}`;
  const [startDate, setStartDate] = useState(new Date());

  let userRole = localStorage.getItem("role");
  

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
        console.log(sections,"before******************")
        setSections(classArray[0].section)
        console.log(classArray[0].section);
        console.log(sections,"*********");
        sections.forEach(element => {
          console.log(element)
        });
        
       
  
      });
  
  }


  function termHandler(e) {
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
        setClasses(numberGrade);
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
      });
    // setTerm(terms)
  }

  function searchHandler() {
    // const enteredId = id.current.value;
    // const term = termRef.current.value;
    const grade = gradeRef.current.value;
    const section = sectionRef.current.value;

    setIsLoading(true);
    fetch(
      // "https://student-monitoring.herokuapp.com/filter-attendance/year/term/grade/section
      "http://localhost:8080/api/filter-attendance/" +
        // year +
        // "/" +
        // term +
        // "/" +
        grade +
        "/" +
        section +
        "/" +
        startDate,{
          method: "GET",
          
          headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
        })
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
          {setError(data.message);
            setTimeout(() => {  setError(""); }, 2000);}
        else setError("");
        // setTerm([term])
        setClasses([grade]);
        setSections([section]);
      });
  }
  useEffect(() => {}, []);

  if (isLoading) {
    
    return (
      <section>
        <div>
          <h5 style={{ color: "black" }}>Loading Please Wait...</h5>
          <Spinner style={{ color: "black" }} animation="border" />
        </div>
      </section>
    );
  }
  

  return (
    <section style={{ margin: "auto" }}>
      {/* <Layout> */}
      <Container>
        <h1>View Attendance</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Row>
          <Col sm={8}>
            <Row>
              <Form.Group id="grade" style={{ marginLeft: "30px" }}>
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  ref={gradeRef}
                  required
                  onClick={termHandler}
                >
                  {classes.map((item) => {
                    return <option>{item}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group id="section" style={{ marginLeft: "30px" }}>
                <Form.Label>Section</Form.Label>
                <Form.Control size="sm" as="select" ref={sectionRef} required onClick={gradeChangeHandler}>
                  {sections.map((item) => {
                    return <option>{item}</option>;
                  })}
                </Form.Control>
              </Form.Group>
              <Form.Group id="date" style={{ marginLeft: "30px" }}>
                <Form.Label>Date</Form.Label>
                <DatePicker
                  dateFormat={"dd-MM-yyyy"}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Form.Group>
            </Row>
          </Col>
          <Col sm={4}>
            <Button
              style={{ marginTop: "20px" }}
              className="w-100"
              onClick={searchHandler}
            >
              <svg
                style={{ marginRight: "10px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>{" "}
              Search
            </Button>
          </Col>
        </Row>
      </Container>
      <AttendanceList students={loadedStudent} />
      {/* </Layout> */}
    </section>
  );
}

export default ViewAttendancePage;
