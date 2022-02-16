



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
function UpdateAttendancePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedStudent, setLoadedStudent] = useState([]);
  const [error,setError]= useState();

  const id = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const dateRef = useRef();
  const date = new Date();

  const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  const year =`${date.getFullYear()}`;
  const [startDate, setStartDate] = useState(new Date());
const [termBar,setTermBar] = useState("choose term");
const [gradeBar,setGradeBar] = useState("choose grade");
const [sectionBar,setSectionBar] = useState("choose section");
  


const [term, setTerm] = useState(["Select Term"])
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
      setClasses(gradesArray)
      // console.log(grades);
      // // setSubject(subjects)
      // console.log(grades,"****Grades*****");
      // grades.forEach(element => {
      //   console.log(element)
      // });

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
    // if (gradeRef.current.value == 9 || gradeRef.current.value == 10){
    //   setSubject(subjectsOf9And10)
    // }
    // else setSubject(subjectsOf11And12)
    // console.log(classArray[0].section);
    // console.log(sections,"*********");
    // sections.forEach(element => {
    //   console.log(element)
    // });
    
    // setResponse(data.message);

  });
  setTerm(terms)
}

  function  searchHandler(){
    const enteredId = id.current.value;
  const enteredTerm = termRef.current.value;
  const enteredGrade = gradeRef.current.value;
  const enteredSection = sectionRef.current.value;
  const enteredDate = dateRef.current.value;
  console.log(startDate)
// const searchDate = {
//     date :enteredDate
// };
    setIsLoading(true);
    fetch(
     
        "http://localhost:8080/api/get-attendance/"+year+"/"+enteredTerm+"/"+enteredGrade+"/"+enteredSection+"/"+enteredId+"/"+startDate
        // {
        //     method: "GET",
        //     body: JSON.stringify(searchDate),
        //     // headers: { "Content-Type": "application/json" },
        //   }
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
        setTerm([enteredTerm])
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
       <DataEncoderCenterLayout >  <Container  style={ {marginBottom:"30px"}}>
       <h1>Update Attendance</h1>
       {error && <Alert variant="danger">{error}</Alert>}
       <Form  onSubmit= {searchHandler}>
       <Row>
      
              <Col sm = {9}><Row>
             
         <Form.Group id="term" style={{marginLeft:"30px"}}>
                       <Form.Label>Term</Form.Label>
                       {/* <Form.Label htmlFor="inputTerm">Color picker</Form.Label> */}
                       
                         <Form.Control id="inputTerm" size="sm" as="select" onClick={termHandler} ref={termRef} required >
                         
                           {/* <option>first-term</option>
                           <option>sescond-term</option>
                           <option>third-term</option>
                           <option>fourth-term</option> */}

{term.map(item => {
      return (<option  >{item}</option>);})}
                         </Form.Control>
                         {/* <label id = "fileName" className="custom-file-label" htmlFor="inputTerm"  >
   
                         {termBar}</label> */}
                       </Form.Group>
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
                           {/* <option>A</option>
                           <option>B</option>
                           <option>C</option>
                           <option>D</option> */}

                                                          
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
                Search
              </Button>

              
              </Col>
  
  </Row>
  </Form>
  
 
  
</Container>

      
      <AttendanceList attendance = {loadedStudent}   /></DataEncoderCenterLayout>
      

    </section>
  );
}

export default UpdateAttendancePage;
