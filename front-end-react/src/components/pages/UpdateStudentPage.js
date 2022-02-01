import StudentList from "../data-encoder/StudentList";
import UpdateStudent from "../data-encoder/UpdateStudent";
import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Table ,ListGroup, Form, FormControl, Button, Container, Row, Col} from "react-bootstrap"

import enteredId from "./AllStudentsPage";
import axios from "axios";
import { useAuth } from "../../AuthContext/AuthContext";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
function UpdateStudentPage() {

    const id = useRef();
    const enteredId = id.current.value;
 
const [isLoading, setIsLoading] = useState(true);
  const [loadedStudent, setLoadedStudent] = useState("");

   
//   useEffect(() => {
//     setIsLoading(true);
    function searchHandler(){
    fetch("https://student-monitoring.herokuapp.com/api/Student-Information/"+enteredId)
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        const student = [];

        for (const key in data) {
          const studentData = {
            id: key,
            ...data[key],
          };
          studentData.push(studentData);
        }
        // setIsLoading(false);
        setLoadedStudent(student);

        
      });
    }

//   if (isLoading) {
//     return (
//       <section>
//         <p>Loading...</p>
//       </section>
//     );
//   }

  return (
      <section>


          <Container>
  <Row>
    <Col sm={8}><h1>Update Student</h1></Col>
    <Col sm={4}>
     
    <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" />
    <Button  className="w-100" onClick = {searchHandler}>
                Search
              </Button>
 </Col>
  </Row>
</Container>
        


        {/* <StudentList studentData = {loadedStudent}  /> */}
        
      
      
     
      </section>
  );
}

export default UpdateStudentPage;













//     const [isLoading, setIsLoading] = useState(true);
//     const [loadedStudent, setLoadedStudent] = useState([]);

// const id = useRef();
// const enteredId = id.current.value;



// //   const history = useHistory();
// // function searchHandler(event){
// //   event.preventDefault();
// //   history.push("/update-student");

// // }

// const {getStudent} = useAuth();

//       const student =  getStudent(enteredId);
//       console.log(student)

//   useEffect(() => {
//     setIsLoading(true);
//     const student =  getStudent(enteredId);
//     console.log(student)
//   }, []);

//   if (isLoading) {
//     return (
//       <section>
//         <p>Loading...</p>
//       </section>
//     );
//   }