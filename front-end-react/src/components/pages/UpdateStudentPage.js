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
    fetch(
      "http://localhost:8080/api/Student-Information/"+enteredId
      // "https://student-monitoring.herokuapp.com/api/Student-Information/"+enteredId
      )
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


  return (
      <section>


          <Container>
  <Row>
    <Col sm={8}><h1>Search and Update Student</h1></Col>
    <Col sm={4}>
     
    <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" />
    <Button  className="w-100" onClick = {searchHandler}>
    <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>  Search 
              </Button>
 </Col>
  </Row>
</Container>
        


        
      
      
     
      </section>
  );
}

export default UpdateStudentPage;
