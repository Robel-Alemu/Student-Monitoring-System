



import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";



import { Form, Button, Card, FormControl, Alert,Container, Row, Col,Spinner } from "react-bootstrap";

import { useState, useEffect } from "react";
import { useRef } from "react";
import UpdateAttendance from "../data-encoder/UpdateAttendance";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import AttendanceList from "../data-encoder/AttendanceList";
import CommonLayout from "../layout/CommonLayout";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Login from "../authentication/Login";
function UpdateAttendancePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError]= useState();

  const id = useRef();
  // const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const dateRef = useRef();
  const date = new Date();

  const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  // const year =`${date.getFullYear()}`;
  const [startDate, setStartDate] = useState(new Date());
const [termBar,setTermBar] = useState("choose term");
const [gradeBar,setGradeBar] = useState("choose grade");
const [sectionBar,setSectionBar] = useState("choose section");
  
let userRole = localStorage.getItem("role");

// const [term, setTerm] = useState(["Select Term"])
const [sections,setSections]=useState(["Select Section"]);
const [classes,setClasses] = useState(["Select Grade"]);
const terms = ["first-term", "second-term", "third-term", "fourth-term"];





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
      setClasses(numberGrade)
     

})


fetch(
  "http://localhost:8080/api/get-class/"+gradeRef.current.value
  // "https://student-monitoring.herokuapp.com/api/Student-Information",
 
  
  )
  .then((response) => {
    
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
    
    console.log(sections,"before******************")
    setSections(classArray[0].section)
   

  });
  // setTerm(terms)
}

  function  searchHandler(){
    const enteredId = id.current.value;
  // const enteredTerm = termRef.current.value;
  const enteredGrade = gradeRef.current.value;
  const enteredSection = sectionRef.current.value;
  const enteredDate = dateRef.current.value;
  console.log(startDate)

    setIsLoading(true);
    fetch(
     
        "http://localhost:8080/api/get-attendance/"+enteredGrade+"/"+enteredSection+"/"+enteredId+"/"+startDate
     
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
        // setTerm([enteredTerm])
        setClasses([enteredGrade])
        setSections([enteredSection])
        // console.log(loadedStudent[0]);
        if (data.message == "No student record found") setError(data.message);
        else setError("");
        // alert(data.message);
      });

  }
  useEffect(() => {
    
     
  },[]);

  // if (isLoading) {
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
  // }
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

    else if (userRole == "Data Encoder") {
  return (
    <section >
       <DataEncoderCenterLayout >  <Container  style={ {marginBottom:"30px"}}>
       <h1>Search and Update Attendance</h1>
       {error && <Alert variant="danger">{error}</Alert>}
       <Form  onSubmit= {searchHandler}>
       <Row>
      
              <Col sm = {9}><Row>
              {/* <Form.Group id="term" style={{marginLeft:"30px"}}>
                       <Form.Label>Term</Form.Label>
                      
                       
                         <Form.Control id="inputTerm" size="sm" as="select" onClick={termHandler} ref={termRef} required >
                         
                          

{term.map(item => {
      return (<option  >{item}</option>);})}
                         </Form.Control>
                      
                       </Form.Group> */}

                       <Form.Group id="grade" style={{marginLeft:"30px"}}>
                       <Form.Label>Grade</Form.Label>
                         <Form.Control size="sm" as="select" ref={gradeRef} defaultValue={gradeBar} required onClick={termHandler}>
                           {/* <option>9</option>
                           <option>10</option>
                           <option>11</option>
                           <option>12</option> */}
                           
{classes.map(item => {
      return (<option  >{item}</option>);
  })}
                         </Form.Control>
                       </Form.Group>
                       <Form.Group id="section" style={{marginLeft:"30px"}}>
                       <Form.Label>Section</Form.Label>
                         <Form.Control size="sm" as="select" ref={sectionRef} defaultValue={sectionBar} required>
                          

                                                          
{sections.map(item => {
      return (<option  >{item}</option>);
  })}
                         </Form.Control>
                       </Form.Group>
                       <Form.Group id="date" style={{marginLeft:"30px"}}>
                       <Form.Label>Date</Form.Label>
                       <DatePicker dateFormat={"yyyy-MM-dd"} ref={dateRef} selected={startDate} onChange={(date) => setStartDate(date)} />
                       </Form.Group>
                      
            
             {/* <Col sm={4}>
              
          </Col> */}
           </Row>
           </Col>
           <Col sm = {3}>
             
             <FormControl type="text" placeholder="Search by ID" ref={id} className=" mr-sm-2" style={{marginTop:"25px"}} required/>
    <Button  className="w-100" style={ {marginTop:"15px"}} type="submit">
    <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg>  Search 
              </Button>

              
              </Col>
  
  </Row>
  </Form>
  
 
  
</Container>

      
      <AttendanceList attendance = {loadedStudent}   /></DataEncoderCenterLayout>
      

    </section>
  );
        }
        else{
          return(
            <Login/>
          )
        }
}

export default UpdateAttendancePage;
