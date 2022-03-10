import React, { useState } from "react"
import Login from "../authentication/Login";

import DataEncoderLayout from "../layout/DataEncoderLayout"
import AllStudentsPage from "../pages/AllStudentsPage"
import { Table ,Card,ListGroup, Form, FormControl, Button, Container, Row, Col} from "react-bootstrap"


export default function DataEncoderDashboard() {

  let userRole = localStorage.getItem('role')
  if(userRole == "Data Encoder"){
    return (
  
      
  
 
<section>
<DataEncoderLayout>
<Container>
  <Row>
  <Col sm={6}>
    <Card>
  <Card.Header as="h5">Adding Multiple Students</Card.Header>
  <Card.Body>
    {/* <Card.Title>Instructions</Card.Title> */}
    <Card.Text>
    Download the sample excel file. Please ensure that the following conditions are met before submitting your request.
    <ul>
      <li>The student Id must be unique among all students in the file.</li>
      <li>All fields must be filled out, with the exception of one parent's information, which is optional.</li>


    </ul>

    </Card.Text>
    <Button variant="outline-success"> <a style={{color:"black"}}
        href="https://firebasestorage.googleapis.com/v0/b/phoneauth2-c5056.appspot.com/o/students2.xlsx?alt=media&token=1666fda1-b676-4f28-827d-e12febfb3ad1"
        
      >
        Click to download
      </a></Button>
  </Card.Body>
</Card>
 </Col>
    <Col sm={6}>
    <Card>
  <Card.Header as="h5">Adding and Updating Grades</Card.Header>
  <Card.Body>
    {/* <Card.Title>Instructions</Card.Title> */}
    <Card.Text> Download the sample excel file. Please ensure that the following conditions are met before submitting your request.
    <ul>
      <li>
        Student Id, student Name, grade, section, subject, and term fields must be provided
      </li>
      <li>
      <li>The student Id must be unique among all students in the file.</li>
      </li>
      <li>
        grade, section, subject, and term in file must much corresponding values selected on the system
      </li>
    </ul>
    </Card.Text>
    <Button variant="outline-success"> <a style={{color:"black"}}
        href="https://firebasestorage.googleapis.com/v0/b/phoneauth2-c5056.appspot.com/o/grade2.xlsx?alt=media&token=df6efb30-1c46-45de-9466-b45c9e5026cc"
        
      >
        Click to download
      </a></Button>
  </Card.Body>
</Card>

    </Col>
    
    <Col sm={6}>
    <Card>
  <Card.Header as="h5">Adding Attendance</Card.Header>
  <Card.Body>
    {/* <Card.Title>Instructions</Card.Title> */}
    <Card.Text> Download the sample excel file. Please ensure that the following conditions are met before submitting your request.
    <ul>
      <li>
        Student Id, student Name, grade, section, status fields must be provided
      </li>
      <li>
      <li>The student Id must be unique among all students in the file.</li>
      </li>
      <li>
        grade, and section in file must much corresponding values selected on the system
      </li>
      <li>
        Status should only be values of<ul><li>
        (A: represens "Absent")</li>
        <li>
        (P: represens "Present")
          </li>
          <li>
            (Permission)
          </li>
          <li>
            If date is not provided, the current date will be the default value
          </li>
          </ul> 
      </li>
    </ul>
    </Card.Text>
    <Button variant="outline-success"> <a style={{color:"black"}}
        href="https://firebasestorage.googleapis.com/v0/b/phoneauth2-c5056.appspot.com/o/attendance.xlsx?alt=media&token=92ff33b6-c091-4efb-b04d-0a9374c9e0f6"
        
      >
        Click to download
      </a></Button>
  </Card.Body>
</Card>

    </Col>
    
  </Row>
</Container>
</DataEncoderLayout>


 </section>

     
      
  
  
    );
  }
  else {
    return(
      <Login/>
    );
  }
  
}
