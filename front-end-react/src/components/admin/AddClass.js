import { useRef } from "react";
import classes from "./AddUser.module.css";
// import Card from "../ui/Card"
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import Adminavigation from "./AdminNavigation";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import { useState } from "react";
import Login from "../authentication/Login";
function AddClass() {
  const classInputRef = useRef();
  const sectionInputRef = useRef();
//   const roleInputRef = useRef();
//   const emailInputRef = useRef("");
//   const passwordInputRef = useRef("");
let userRole = localStorage.getItem("role")


  const [error, setError] = useState();
  const [success, setSuccess] = useState();
    const classes  = [1,2,3,4,5,6,7,8,9,10,11,12];
    const sectionsAvailale = ['A','B','C','D','E','F','G']
    // const [isRequired,setIsRequired] = useState(true)
  
    const [section,setSection]=useState([])
    
    function sectionHandler(e){
      e.preventDefault();
      const sections = [...section]
        
        const sectionName = sectionInputRef.current.value;
        sections.push(sectionName);
        setSection(sections)
        console.log(sectionName,"--------",section)
        // document.getElementById("sec").value=null;
// setIsRequired(false);
    
      }
      console.log(section,"********")
     
  function submitHandler(event) {
    event.preventDefault();
    
    console.log(section,"right after")
      // const sectionName = sectionInputRef.current.value;
          let uniqueSections = [...new Set(section)];
      const className = classInputRef.current.value;
      const classData = {
        class: className,
        sections: uniqueSections,
        
      };
   
      // setSection(...sections);
      
      
      console.log(classData);
      // console.log(uniqueSections,"unique");
    
   
     
   

    fetch(
      "http://localhost:8080/api/add-class",
      {
        method: "POST",
        body: JSON.stringify(classData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Class Added successfully") {
          setSuccess(data.message);
          setError("");
          setSection([])
        } else {
          setError(data.message);
          setSuccess("");
          setSection([])
         
        }
        // alert(data.message);
        console.log(data)
       
      }
    );
        
    
  }

  



//   function loadHandler(event){
//     event.preventDefault();
//     var email = document.getElementById("email");
//     email.value = " ";
//     var password = document.getElementById("password");
//     password.value = " ";

//   }

  
if (userRole == "Admin"){
  return (
    <LayoutCenter><Card>

<Card.Body>
            <h3 className="text-center mb-4">Add Class</h3>

            {/* {error && <Alert variant="danger">{error}</Alert>} */}

            {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={submitHandler} >
              <Container>
                <Row>
                  <Col sm = {3}>

                  <Form.Group id="class">
              <Form.Label>Class</Form.Label>
                <Form.Control as="select" ref={classInputRef} size="sm" required>
                  
{classes.map(item => {
      return (<option  >{item}</option>);})}

                </Form.Control>
              </Form.Group>
                    
                  {/* <Form.Group id="class">
                <Form.Label>Class</Form.Label>
                <Form.Control type="text" placeholder="Enter Class" ref={classInputRef} size="sm" required />
              </Form.Group> */}
              </Col>
              <Col  sm={3}>
              <Form.Group id="section">
              <Form.Label>Section</Form.Label>
                <Form.Control as="select" ref={sectionInputRef} size="sm" required ref={sectionInputRef} >
                  
{sectionsAvailale.map(item => {
      return (<option  >{item}</option>);})}

                </Form.Control>
              </Form.Group>
                
                {/* <Form.Group id="section">
                <Form.Label>Section</Form.Label>
                <Form.Control id="sec" type="text" placeholder="Enter Section" ref={sectionInputRef} size="sm" required={isRequired} />
              </Form.Group> */}
              </Col>
              
              
                  <Col style={{marginTop:"30px"}} sm={4}><Button  className="w-100" onClick={sectionHandler}>
                Add Section
              </Button></Col> 
                
                  
                </Row>
              </Container>
            
              <Button style={{marginTop:"30px"}} sm={4}  className="w-100" type="submit">
                Add Class
              </Button>
            </Form></Card.Body>
    
  </Card></LayoutCenter>
      
    
  );
}
else{
  return(
    <Login/>
  )
}
}

export default AddClass;
