
import { Form, Button, Card, FormControl, Alert,Container, Row, Col } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";
import StudentList from "../data-encoder/StudentList";
import DataEncoderLayout from "../layout/DataEncoderLayout";

function EditStudentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  

  const id = useRef();
   

  


  function  searchHandler(){
    const enteredId = id.current.value;
    setIsLoading(true);
    fetch(
      "https://student-monitoring.herokuapp.com/api/Student-Information/"+enteredId
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
        console.log(loadedStudent[0]);
        alert(data.message);
      });

  }
  useEffect(() => {
    
     
  },[]);

  if (isLoading) {
    return (
      <section>
          <DataEncoderLayout><p>Loading...</p></DataEncoderLayout>
        
      </section>
    );
  }

  return (
    <section >
        <DataEncoderLayout><Container>
  <Row>
    <Col sm={8}><h1>Student</h1></Col>
    <Col sm={4}>
     
    <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginBottom:"30px"}}/>
    <Button  className="w-100" onClick = {searchHandler}>
                Search
              </Button>
 </Col>
  </Row>
</Container>

      
      <StudentList student = {loadedStudent}   /></DataEncoderLayout>
      

    </section>
  );
}

export default EditStudentPage;
