
import { Form, Button, Card, FormControl, Alert,Container, Row, Col, Spinner } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";
import StudentList from "../data-encoder/StudentList";
import DataEncoderLayout from "../layout/DataEncoderLayout";

function EditStudentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError] = useState();
 

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
        // console.log(loadedStudent[0]);
        // alert(data.message);
        if (data.message == "No student record found") {setError(data.message);
          }
  
          else {
            setError("");}
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
        <DataEncoderLayout><Container>
  <Row>
    <Col sm={8}><h2>Update Student </h2>
      {error && <Alert variant="danger">{error}</Alert>}
            </Col>
    <Col sm={4}>
    <Form onSubmit={searchHandler}>
    <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginBottom:"20px"}} required/>
    <Button  className="w-100" type="submit">
                Search
              </Button>
              </Form>
 </Col>
  </Row>
</Container>

      
      <StudentList student = {loadedStudent}   /></DataEncoderLayout>
      

    </section>
  );
}

export default EditStudentPage;
