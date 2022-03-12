import {
  Form,
  Button,
  Card,
  Alert,
  Container,
  FormControl,
  Row,
  Col,
  Spinner,Nav, Navbar,NavDropdown
} from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";

import DataEncoderLayout from "../layout/DataEncoderLayout";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";


import GradesList from "../admin/GradesList";
import Layout from "../layout/Layout";

import StudentGrade from "../data-encoder/StudentGrade";
import Login from "../authentication/Login";

function SearchGradePage({ title }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError] = useState();
    const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const subjectRef = useRef();
  let x = { title };
  const [term, setTerm] = useState(["Select Term"])
  const [sections,setSections]=useState(["Select Section"]);
  const [grades,setGrades] = useState(["Select Grade"]);
  const [subject,setSubject] = useState(["Select Subject"]);
  const subjects = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "Physical Education", "IT", "Geography", "History", "Economics" ];
  
  const subjectsOf11And12 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "HPE", "IT","TD", "Geography", "History", "Economics","Business" ];
  const subjectsOf9And10 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry","Geography","History", "Civics", "HPE", "IT"];
const subjectOf1To4 = ["Amharic","English","English Maths","Amharic Maths","English Science","Amharic Science","Music Art"]
const subjectOf5And6 = ["Amharic","English","Maths","General Science","Social Studies","Civics","Music Art","Physical Education"]
const subjectOf7And8 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "Physical Education","Social Studies"];  
  
  let userRole = localStorage.getItem("role")
  const terms = ["first-term", "second-term", "third-term", "fourth-term"];
function onLoadHandler(e){
  e.preventDefault();

}

  function gradeChangeHandler(e) {
    e.preventDefault();
  
  
    fetch(
      "http://localhost:8080/api/get-class/"+gradeRef.current.value
      // "https://student-monitoring.herokuapp.com/api/Student-Information",
     
      
      )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        const classArray = [];
  
        for (const key in data) {
          const classData = {
            id: key,
            ...data[key],
          };
          classArray.push(classData);}
        // alert(data.message);
        console.log(sections,"before******************")
        setSections(classArray[0].section)
        console.log(classArray[0].section);
        console.log(sections,"*********");
        sections.forEach(element => {
          console.log(element)
        });
        
       
  
      });
  
  }

  function termHandler(e){
    e.preventDefault();
    fetch(
      "http://localhost:8080/api/get-all-class"
      // "https://student-monitoring.herokuapp.com/api/Student-Information",
     
      
      )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        const classArray = [];
  
        for (const key in data) {
          const classData = {
            id: key,
            ...data[key],
          };
          classArray.push(classData);}
        // alert(data.message);
       const gradesArray = []
        classArray.forEach(x=>{
          console.log(x);
          gradesArray.push(x.class_)
  
        })
        const numberGrade = []
        gradesArray.forEach(x=>{
          numberGrade.push(parseInt(x))
        })
      numberGrade.sort(function(a, b) {
        return a - b;
      });
      console.log(numberGrade)
      setGrades(numberGrade)
        // setGrades(gradesArray)
        console.log(grades);
        // setSubject(subjects)
        console.log(grades,"****Grades*****");
        grades.forEach(element => {
          console.log(element)
        });
  
  })
  
  fetch(
    "http://localhost:8080/api/get-class/"+gradeRef.current.value
    // "https://student-monitoring.herokuapp.com/api/Student-Information",
   
    
    )
    .then((response) => {
      // console.log(response);
      return response.json();
    })
    .then((data) => {
      const classArray = [];

      for (const key in data) {
        const classData = {
          id: key,
          ...data[key],
        };
        classArray.push(classData);}
      // alert(data.message);
      console.log(sections,"before******************")
      setSections(classArray[0].section)
      if (gradeRef.current.value == 9 || gradeRef.current.value == 10){
        setSubject(subjectsOf9And10)
      }
      else if(gradeRef.current.value == 7 || gradeRef.current.value == 8)
       setSubject(subjectOf7And8)
       else if(gradeRef.current.value == 6 || gradeRef.current.value == 5)
       setSubject(subjectOf5And6)
       else if(gradeRef.current.value == 1 || gradeRef.current.value == 2 && gradeRef.current.value == 3 || gradeRef.current.value == 4)
       setSubject(subjectOf1To4)
       else if(gradeRef.current.value == 11 || gradeRef.current.value == 12)
       setSubject(subjectsOf11And12)




      console.log(classArray[0].section);
      console.log(sections,"*********");
      sections.forEach(element => {
        console.log(element)
      });
      
      // setResponse(data.message);

    });
    setTerm(terms)


  }

  function subjectHandler(e){
    e.preventDefault()
    
        if (gradeRef.current.value == 9 || gradeRef.current.value == 10){
          setSubject(subjectsOf9And10)
        }
        else if(gradeRef.current.value == 7 || gradeRef.current.value == 8)
         setSubject(subjectOf7And8)
         else if(gradeRef.current.value == 6 || gradeRef.current.value == 5)
         setSubject(subjectOf5And6)
         else if(gradeRef.current.value == 1 || gradeRef.current.value == 2 && gradeRef.current.value == 3 || gradeRef.current.value == 4)
         setSubject(subjectOf1To4)
         else if(gradeRef.current.value == 11 || gradeRef.current.value == 12)
         setSubject(subjectsOf11And12)
  
  
  }

  function searchHandler() {
    // const enteredId = id.current.value;
    const term = termRef.current.value;
    const grade = gradeRef.current.value;
    const section = sectionRef.current.value;
    const subject = subjectRef.current.value;
    setIsLoading(true);
    fetch(
      // "https://student-monitoring.herokuapp.com
      "http://localhost:8080/api/get-grade/" +
        term +
        "/" +
        grade +
        "/" +
        section +
        "/" +
        subject + 
        "/" +
        id.current.value
    )
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
        setGrades([grade])
        setSections([section])
          setSubject([subject])
          setTerm([term])
        if (data.message == "No student record found") setError(data.message);
        else setError("");
                
        // console.log(loadedStudent[0]);
        // alert(data.message);
      });
  }
  useEffect(() => {}, []);



if (isLoading) {
  
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



else if(userRole == "Data Encoder"){
  return (
    <section>
    
      <DataEncoderLayout>
        <Container style={{marginBottom:"30px"}}>
          <Form onSubmit= {searchHandler}>
          <Row>
            <Col sm={8}>
              <h1>Search and Edit Student Grade</h1>
              {error && <Alert variant="danger">{error}</Alert>}
            </Col>
          </Row>

          <Row></Row>
          <Row >
            <Form.Group id="term">
              <Form.Label>Term</Form.Label>
              <Form.Control size="sm" as="select" ref={termRef} required onClick={termHandler}>
          
              {term.map(item => {
      return (<option  >{item}</option>);
  })}
              </Form.Control>
            </Form.Group>
            <Form.Group id="grade" style={{marginLeft:"30px"}}>
              <Form.Label>Grade</Form.Label>
              <Form.Control size="sm" as="select" ref={gradeRef} required 
              onClick={termHandler}>
              

{grades.map(item => {
      return (<option  >{item}</option>);
  })}
              </Form.Control>
            </Form.Group>
            <Form.Group id="section" style={{marginLeft:"30px"}}>
              <Form.Label>Section</Form.Label>
              <Form.Control size="sm" as="select" ref={sectionRef} required onClick={gradeChangeHandler}>
              
                
{sections.map(item => {
      return (<option  >{item}</option>);
  })}
              </Form.Control>
            </Form.Group>
            <Form.Group id="subject" style={{marginLeft:"30px"}}>
              <Form.Label>Subject</Form.Label>
              <Form.Control size="sm" as="select" ref={subjectRef} required onClick={subjectHandler}>
              

{subject.map(item => {
      return (<option  >{item}</option>);
  })}
              </Form.Control>
            </Form.Group>
            <Col sm = {3}>
             
             <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginTop:"25px", marginLeft:"90%"}} required/>
    <Button  className="w-100" style={ {marginTop:"15px",marginLeft:"90%"}} type="submit">
    <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>  Search 
              </Button>

              
              </Col>
            </Row>
            <Row >   
              
           
           
           </Row>
          
          
  </Form>
        </Container>

        <StudentGrade student={loadedStudent} />
     
      </DataEncoderLayout>
    </section>);
}
else{
  return(
    <Login/>
  )
}
  

}
export default SearchGradePage;
