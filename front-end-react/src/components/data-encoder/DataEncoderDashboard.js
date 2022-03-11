import React, { useState } from "react"
import Login from "../authentication/Login";

import DataEncoderLayout from "../layout/DataEncoderLayout"
import AllStudentsPage from "../pages/AllStudentsPage"
import { Table ,Card,ListGroup, Form, FormControl, Button, Container, Row, Col} from "react-bootstrap"
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import classes from "./DataEncoderNavigation.module.css";

export default function DataEncoderDashboard() {

  let userRole = localStorage.getItem('role')
  if(userRole == "Data Encoder"){
    return (
  
      
  
 
<section>
<DataEncoderCenterLayout>
<Container>
  <Row>
  <Col sm={12}>
    <Card style={{marginBottom:"30px"}}>
  <Card.Header as="h5">Adding Multiple Students</Card.Header>
  <Card.Body>
    <Card.Title>Instruction</Card.Title>
    <Card.Text>
    Download the sample excel file. Please ensure that the following conditions are met before submitting your request.
    <ul>
      <li>The student Id must be unique among all students in the file.</li>
      <li>All fields must be filled out, with the exception of one parent's information, which is optional.</li>


    </ul>

    </Card.Text>
    <Button variant="success"><svg style={{marginRight:"5px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg> <a className={classes.download} style={{color:"white"}}
        href="https://firebasestorage.googleapis.com/v0/b/phoneauth2-c5056.appspot.com/o/students2.xlsx?alt=media&token=1666fda1-b676-4f28-827d-e12febfb3ad1"
        
      >
        Click to download
      </a>
      </Button>
  </Card.Body>
</Card>
 </Col>
    <Col sm={12}>
    <Card style={{marginBottom:"30px"}}>
  <Card.Header as="h5">Adding and Updating Grades</Card.Header>
  <Card.Body>
    <Card.Title>Instruction</Card.Title>
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
    <Button variant="success"><svg style={{marginRight:"5px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg> <a className={classes.download} style={{color:"white"}}
        href="https://firebasestorage.googleapis.com/v0/b/phoneauth2-c5056.appspot.com/o/grade2.xlsx?alt=media&token=d372ad59-b47f-43e1-9cea-c19da3ce57d2"
        
      >
        Click to download
      </a>
      </Button>
  </Card.Body>
</Card>

    </Col>
    
    <Col sm={12}>
    <Card style={{marginBottom:"30px"}}>
  <Card.Header as="h5">Adding Attendance</Card.Header>
  <Card.Body>
    <Card.Title>Instruction</Card.Title>
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
    <Button variant="success"><svg style={{marginRight:"5px"}} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
</svg> <a  className={classes.download} style={{color:"white",  }}
        href="https://firebasestorage.googleapis.com/v0/b/phoneauth2-c5056.appspot.com/o/attendance.xlsx?alt=media&token=92ff33b6-c091-4efb-b04d-0a9374c9e0f6"
        
      >
        Click to download
      </a></Button>
  </Card.Body>
</Card>

    </Col>
    
  </Row>
</Container>
</DataEncoderCenterLayout>


 </section>

     
      
  
  
    );
  }
  else {
    return(
      <Login/>
    );
  }
  
}
