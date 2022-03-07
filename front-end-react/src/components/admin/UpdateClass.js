import { useRef } from "react";
import classes from "./AddUser.module.css";
// import Card from "../ui/Card"
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import Adminavigation from "./AdminNavigation";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import { useState } from "react";
import Login from "../authentication/Login";
function UpdateClass() {
  const classInputRef = useRef();
  const sectionInputRef = useRef();
//   const roleInputRef = useRef();
//   const emailInputRef = useRef("");
//   const passwordInputRef = useRef("");
let userRole = localStorage.getItem("role")
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
    const [sections,setSections] = useState();
    const [isRequired,setIsRequired] = useState(true)
    const classes  = [1,2,3,4,5,6,7,8,9,10,11,12];
    const sectionsAvailale = ['A','B','C','D','E','F','G']
const [section,setSection]=useState([])

//     function sectionHandler(e){
//         e.preventDefault();
//         const sectionName = sectionInputRef.current.value;
//         section.push(sectionName)
//         document.getElementById("sec").value=null;
// setIsRequired(false);
    
//       }
function sectionHandler(e){
  e.preventDefault();
  const sections = [...section]
    
    const sectionName = sectionInputRef.current.value;
    sections.push(sectionName);
    setSection(sections)
    console.log(sectionName,"--------",section)
    // document.getElementById("sec").value=null;
setIsRequired(false);

  }

  function submitHandler(event) {
   
    
    // const className = classInputRef.current.value;
    // const sectionName = sectionInputRef.current.value;
    // // const enteredRole = roleInputRef.current.value;
    // // const enteredEmail = emailInputRef.current.value;
    // // const enteredPassword = passwordInputRef.current.value;
    // let uniqueSections = [...new Set(section)];

    // const classData = {
    //   class: className,
    //   sections: uniqueSections,
      
    // };
    // console.log(classData);
    // console.log(uniqueSections,"unique");
    
    // event.preventDefault();
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
    

    fetch(
      "http://localhost:8080/api/update-class/"+className,
      {
        method: "PUT",
        body: JSON.stringify(classData),
        headers: { "Content-Type": "application/json" },
      }
     
     ).then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "class updated successfully") {
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

  



  if (userRole == "Admin"){

  return (
    <LayoutCenter><Card>

<Card.Body>
            <h3 className="text-center mb-4">Update Class</h3>

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

{/*                     
                  <Form.Group id="class">
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
              </Button>
              </Col> 
                
                  
                </Row>
              </Container>
            
              <Button style={{marginTop:"30px"}} sm={4}  className="w-100" type="submit">
                Update Class
              </Button>
            </Form></Card.Body>
    
  </Card></LayoutCenter>
      
    
  );
  }
  else {
    return(
      <Login/>
    )
  }
}

export default UpdateClass;
