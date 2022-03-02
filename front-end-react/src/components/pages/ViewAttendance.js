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
  let userRole = "";
  const { currentUser, getUser } = useAuth();
  const email = currentUser.email;
  const [userr, setUser] = useState();
   async function getUserRole(email){
    let  us = "";
      let user = await getUser(email);
      if (user.message === 'Account does not exist!'){
        console.log(user.message);
      }
      else
      us = user.role;
      console.log(user.role, "--------------------")
       return us;
  }
  
  fetch(
    // "https://student-monitoring.herokuapp.com
    "http://localhost:8080/api/users/"+email 
     
  )
    .then((response) => {
      
      return response.json();
    })
    .then((data) => {
      console.log(data[0].role)
      setUser(data[0].role)
    });
      
 

  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error, setError] = useState();
  //   const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const subjectRef = useRef();


  const [term, setTerm] = useState(["Select Term"])
  const [sections,setSections]=useState(["Select Section"]);
  const [classes,setClasses] = useState(["Select Grade"]);
  // const terms = ["first-term", "second-term", "third-term", "fourth-term"];

  const date = new Date();
  let x = { title };
  console.log(x);

  const currentDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;
  // const year = `${date.getFullYear()}`;
  const [startDate, setStartDate] = useState(new Date());


  function termHandler(e){
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
        setClasses(numberGrade)
     
  
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
        // setTerm([term])
        setClasses([grade])
        setSections([section])
       
      });
  }
  useEffect(() => {}, []);

  if (isLoading) {
    if (x.title == "Admin") {
      return (
        <section>
          <Layout>
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
          </Layout>
        </section>
      );
    } else {
      return (
        <section>
          <DataEncoderCenterLayout>
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
          </DataEncoderCenterLayout>
        </section>
      );
    }
  }
  if (x.title == "Admin") {
  // if (x.title == "Admin" && userr == "Admin") {
    
    return (
      <section>
        <Layout>
          <Container>
          <h1>View Attendance</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col sm={8}>
                <Row>
                  {/* <Form.Group id="term" style={{ marginLeft: "30px" }}>
                    <Form.Label>Term</Form.Label>
                    <Form.Control size="sm" as="select" ref={termRef} required onClick={termHandler}>

                      {term.map(item => {
      return (<option  >{item}</option>);})}
                    </Form.Control>
                  </Form.Group> */}
                  <Form.Group id="grade" style={{ marginLeft: "30px" }}>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control size="sm" as="select" ref={gradeRef} required onClick={termHandler}>
                  
                                                 
{classes.map(item => {
      return (<option  >{item}</option>);
  })}
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
                   
                      {sections.map(item => {
      return (<option  >{item}</option>);
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
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
          <AttendanceList students={loadedStudent} />
        </Layout>
      </section>
    );
  } 
  else if( x.title == "Data Encoder") {
  // else if( x.title == "Data Encoder" && userr == "Data Encoder") {
    return (
      <section>
        <DataEncoderLayout>
          <Container>
          <h1>View Attendance</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col sm={8}>
                <Row>
                  {/* <Form.Group id="term" style={{ marginLeft: "30px" }}>
                    <Form.Label>Term</Form.Label>
                    <Form.Control size="sm" as="select" ref={termRef} required onClick={termHandler}>
                  
                      {term.map(item => {
      return (<option  >{item}</option>);})}
                    </Form.Control>
                  </Form.Group> */}
                  <Form.Group id="grade" style={{ marginLeft: "30px" }}>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control size="sm" as="select" ref={gradeRef} required onClick={termHandler}>
                   
                   
                                                 
{classes.map(item => {
      return (<option  >{item}</option>);
  })}
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
                

{sections.map(item => {
      return (<option  >{item}</option>);
  })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group id="date" style={{ marginLeft: "30px" }}>
                    <Form.Label>Date</Form.Label>
                    <DatePicker
                      dateFormat={"yyyy-MM-dd"}
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
                  Search
                </Button>
              </Col>
            </Row>
          </Container>
          <AttendanceList students={loadedStudent} />
        </DataEncoderLayout>
      </section>
    );
  }
  else{
    return (
      <Login/>
    )
  }
}

export default ViewAttendancePage;
