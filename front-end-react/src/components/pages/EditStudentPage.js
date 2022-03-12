
import { Form, Button, Card, FormControl, Alert,Container, Row, Col, Spinner } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";
import StudentList from "../data-encoder/StudentList";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import Login from "../authentication/Login";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";

function EditStudentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError] = useState();
 

  const id = useRef();
   
  let userRole = localStorage.getItem("role")
  


  function  searchHandler(){
    const enteredId = id.current.value;
    setIsLoading(true);
    fetch(
      "http://localhost:8080/api/Student-Information/"+enteredId
      // "https://student-monitoring.herokuapp.com/api/Student-Information/"+enteredId
    )
    // )
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
          console.log(studentData)
        //   alert(data.message);
        }
        setIsLoading(false);
        setLoadedStudent(student);
        
        if (data.message == "No student record found") {setError(data.message);
          }
  
          else {
            setError("");}
      });

  }
  useEffect(() => {
    
     
  },[]);

  if (isLoading) {
  //   return (
  //     <section>
  //         <DataEncoderLayout>  <Button variant="primary" disabled>
  //   <Spinner
  //     as="span"
  //     animation="border"
  //     size="sm"
  //     role="status"
  //     aria-hidden="true"
  //   />
  //   <span className="visually-hidden">Loading...please wait</span>
  
  // </Button></DataEncoderLayout>
        
  //     </section>
  //   );
  if(userRole == "Data Encoder"){
    return (
      <section>
        <DataEncoderLayout>
        <section>
      <div >
    
          
<h5 style={{color:"black"}}>Loading Please Wait...</h5>
<Spinner style={{color:"black"}} animation="border" />
      </div>
         
       
      </section>
        </DataEncoderLayout>
      </section>
    );
  }
  else{
    return (
      <section>
      
        
      <div >
    
      {/* style={{display: "flex" ,justifyContent: "center", alignItems: "center", height:"800px" ,opacity:"0.9"}}    */}
<h5 style={{color:"black"}}>Loading Please Wait...</h5>
<Spinner style={{color:"black"}} animation="border" />
      </div>
         
       
     
       
      </section>
    );
  }
  }

  else if (userRole == "Data Encoder"){

  return (
    <section >
        <DataEncoderLayout>
          <Container style={{marginBottom:"30px"}}>
  <Row>
    <Col sm={8}><h2>Search and Update Student</h2>
      {error && <Alert variant="danger">{error}</Alert>}
            </Col>
    <Col sm={3}>
    <Form onSubmit={searchHandler}>
    <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginBottom:"20px"}} required/>
    <Button  className="w-100" type="submit">
    <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>  Search 
              </Button>
              </Form>
 </Col>
 <Row>
</Row>
  </Row>
  


      
      

      </Container><StudentList  student = {loadedStudent}   />
  
</DataEncoderLayout>
      

    </section>
  );
  }
  else {
    return(
      <Login/>
    )
  }
}

export default EditStudentPage;
