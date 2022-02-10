// import StudentList from "../data-encoder/StudentList";
// import UpdateStudent from "../data-encoder/UpdateStudent";
// import { useState, useEffect } from "react";
// import Layout from "../layout/Layout";
// import { Table ,ListGroup, Form, FormControl, Button, Container, Row, Col} from "react-bootstrap"

// import enteredId from "./AllStudentsPage";
// import axios from "axios";
// import { useAuth } from "../../AuthContext/AuthContext";
// import { useRef } from "react";
// import { useHistory } from "react-router-dom";
// function UpdateAttendancePage() {

//     const id = useRef();
//     const termRef = useRef();
//     const gradeRef = useRef();
//     const sectionRef = useRef();
//     const date = new Date();

//     const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
//     const year =`${date.getFullYear()}`;
//     const enteredId = id.current.value;
//     const enteredTerm = termRef.current.value;
//     const enteredGrade = gradeRef.current.value;
//     const enteredSection = sectionRef.current.value;
 
// const [isLoading, setIsLoading] = useState(true);
//   const [loadedStudent, setLoadedStudent] = useState("");

   
// //   useEffect(() => {
// //     setIsLoading(true);
//     function searchHandler(){
//         // https://student-monitoring.herokuapp.com
//     fetch("http://localhost:8080/api/get-attendance/"+year+"/"+enteredTerm+"/"+enteredGrade+"/"+enteredSection+"/"+enteredId)
//       .then((response) => {
//         console.log(response.body);
//         return response.json();
//       })
//       .then((data) => {
//         const student = [];

//         for (const key in data) {
//           const studentData = {
//             id: key,
//             ...data[key],
//           };
//           studentData.push(studentData);
//         }
//         // setIsLoading(false);
//         setLoadedStudent(student);
//       });
//     }

// //   if (isLoading) {
// //     return (
// //       <section>
// //         <p>Loading...</p>
// //       </section>
// //     );
// //   }

//   return (
//       <section>


//           <Container>
//   <Row>
//     <Col sm={8}><h1>Update Attendance</h1></Col>
//     <Col sm={4}>
     
//     <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" />
//     <Button  className="w-100" onClick = {searchHandler}>
//                 Search
//               </Button>
//  </Col>
//   </Row>
// </Container>
        
// <Form.Group id="term">
//               <Form.Label>Term</Form.Label>
//                 <Form.Control size="sm" as="select" ref={termRef} required>
//                   <option>first-term</option>
//                   <option>sescond-term</option>
//                   <option>third-term</option>
//                   <option>fourth-term</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group id="grade">
//               <Form.Label>Grade</Form.Label>
//                 <Form.Control size="sm" as="select" ref={gradeRef} required>
//                   <option>9</option>
//                   <option>10</option>
//                   <option>11</option>
//                   <option>12</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group id="section">
//               <Form.Label>Section</Form.Label>
//                 <Form.Control size="sm" as="select" ref={sectionRef} required>
//                   <option>A</option>
//                   <option>B</option>
//                   <option>C</option>
//                   <option>D</option>
//                 </Form.Control>
//               </Form.Group>
             


//         {/* <StudentList studentData = {loadedStudent}  /> */}
        
      
      
     
//       </section>
//   );
// }

// export default UpdateAttendancePage;







import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



import { Form, Button, Card, FormControl, Alert,Container, Row, Col,Spinner } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";
import UpdateAttendance from "../data-encoder/UpdateAttendance";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import AttendanceList from "../data-encoder/AttendanceList";
import CommonLayout from "../layout/CommonLayout";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
function UpdateAttendancePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError]= useState();

  const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const dateRef = useRef();
  const date = new Date();

  const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  const year =`${date.getFullYear()}`;
  const [startDate, setStartDate] = useState(new Date());
const [termBar,setTermBar] = useState("choose term");
const [gradeBar,setGradeBar] = useState("choose grade");
const [sectionBar,setSectionBar] = useState("choose section");
  


  function  searchHandler(){
    const enteredId = id.current.value;
  const enteredTerm = termRef.current.value;
  const enteredGrade = gradeRef.current.value;
  const enteredSection = sectionRef.current.value;
  const enteredDate = dateRef.current.value;
  console.log(startDate)
// const searchDate = {
//     date :enteredDate
// };
    setIsLoading(true);
    fetch(
     
        "http://localhost:8080/api/get-attendance/"+year+"/"+enteredTerm+"/"+enteredGrade+"/"+enteredSection+"/"+enteredId+"/"+startDate
        // {
        //     method: "GET",
        //     body: JSON.stringify(searchDate),
        //     // headers: { "Content-Type": "application/json" },
        //   }
    )
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
          
          console.log(data)
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
        setTermBar({termRef})
        setGradeBar({gradeRef})
        setSectionBar({sectionRef})
        // console.log(loadedStudent[0]);
        if (data.message == "No student record found") setError(data.message);
        else setError("");
        // alert(data.message);
      });

  }
  useEffect(() => {
    
     
  },[]);

  if (isLoading) {
    return (
      <section>
          <DataEncoderLayout>  <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...please wait</span>
  
  </Button></DataEncoderLayout>
        
      </section>
    );
  }

  return (
    <section >
       <DataEncoderCenterLayout>  <Container>
       {error && <Alert variant="danger">{error}</Alert>}
       <Row>
      
              <Col sm = {9}><Row>
         
         <Form.Group id="term" style={{marginLeft:"30px"}}>
                       <Form.Label>Term</Form.Label>
                       {/* <Form.Label htmlFor="inputTerm">Color picker</Form.Label> */}
                       
                         <Form.Control id="inputTerm" size="sm" as="select" ref={termRef} required >
                         
                           <option>first-term</option>
                           <option>sescond-term</option>
                           <option>third-term</option>
                           <option>fourth-term</option>
                         </Form.Control>
                         {/* <label id = "fileName" className="custom-file-label" htmlFor="inputTerm"  >
   
                         {termBar}</label> */}
                       </Form.Group>
                       <Form.Group id="grade" style={{marginLeft:"30px"}}>
                       <Form.Label>Grade</Form.Label>
                         <Form.Control size="sm" as="select" ref={gradeRef} defaultValue={gradeBar} required>
                           <option>9</option>
                           <option>10</option>
                           <option>11</option>
                           <option>12</option>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group id="section" style={{marginLeft:"30px"}}>
                       <Form.Label>Section</Form.Label>
                         <Form.Control size="sm" as="select" ref={sectionRef} defaultValue={sectionBar} required>
                           <option>A</option>
                           <option>B</option>
                           <option>C</option>
                           <option>D</option>
                         </Form.Control>
                       </Form.Group>
                       <Form.Group id="date" style={{marginLeft:"30px"}}>
                       <Form.Label>Date</Form.Label>
                       <DatePicker dateFormat={"yyyy-MM-dd"} ref={dateRef} selected={startDate} onChange={(date) => setStartDate(date)} />
                       </Form.Group>
                      
            
             {/* <Col sm={4}>
              
          </Col> */}
           </Row>
           </Col>
           <Col sm = {3}><FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginBottom:"15px"}} required/>
    <Button  className="w-100" onClick = {searchHandler}  >
                Search
              </Button></Col>
  
  </Row>
  
  
 
  
</Container>

      
      <AttendanceList attendance = {loadedStudent}   /></DataEncoderCenterLayout>
      

    </section>
  );
}

export default UpdateAttendancePage;
