import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import xlsx from "xlsx";
import Login from "../authentication/Login";

function AddGrade() {
  const subjectRef = useRef();
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const [term, setTerm] = useState(["Select Term"])
  const [sections,setSections]=useState(["Select Section"]);
  const [classes,setClasses] = useState(["Select Grade"]);
  const [subject,setSubject] = useState(["Select Subject"]);
  const subjectsOf11And12 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "HPE", "IT","TD", "Geography", "History", "Economics","Business" ];
  const subjectsOf9And10 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry","Geography","History", "Civics", "HPE", "IT"];
const subjectOf1To4 = ["Amharic","English","English Maths","Amharic Maths","English Science","Amharic Science","Music Art"]
const subjectOf5And6 = ["Amharic","English","Maths","General Science","Social Studies","Civics","Music Art","Physical Education"]
const subjectOf7And8 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "Physical Education","Social Studies"];  
  const terms = ["first-term", "second-term", "third-term", "fourth-term"];
  
  const [fileName, setFileName]= useState("Choose File");
  const[grade,setGrade] = useState();

  let userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token")
  let grades = [];

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFileName(e.target.files[0].name)
     

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        console.log(sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);

        grades = [...json];
        setGrade(grades);
        console.log(grade,"use state");
        
       
       
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      
    }
    
  };



  
  function loadHandler(e){
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
      console.log(classArray[0].section);
      console.log(sections,"*********");
      sections.forEach(element => {
        console.log(element)
      });
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
      // setResponse(data.message);

    });

  
    setTerm(terms)
    
  }

 

  function clickHandler(e) {
    const enteredSubject = subjectRef.current.value;
    const enteredTerm = termRef.current.value;
    const enteredGrade = gradeRef.current.value;
    const enteredSection = sectionRef.current.value;

    const gradeEntryData = {
      term: enteredTerm,
      grade: enteredGrade,
      section: enteredSection,
      subject: enteredSubject,
    };  
    setGrade(grade.push(gradeEntryData));
    grades.push(gradeEntryData);

    console.log(grades);
    console.log(grade,"use state after add");
    // let x = grades.length-1;
    // grades.forEach(x=>{
    //  y= x.studentId.to
    // })

    e.preventDefault();

    fetch(
      // https://student-monitoring.herokuapp.com
      "http://localhost:8080/api/add-grade",
      {
        method: "POST",
        body: JSON.stringify(grade),
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
      }
    )
      .then((response) => {
        console.log(grades);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Grades added successfully!") {setSuccess(data.message);
        setError("");
        setTimeout(() => {  setSuccess(""); }, 2000);}

        else {setError(data.message);
                setSuccess("");
                setTimeout(() => {  setError(""); }, 2000);}

        // alert(data.message);
        
        document.getElementById("upload").value = null;
        setFileName("Choose File")
        setTerm(["Select Term"])
        setClasses(["Select Class"])
        setSections(["Select Section"])
        setSubject(["Select Subject"])
      });
    // var form = document.getElementById("file");
    // form.reset();

  }


   if (userRole == "Data Encoder") {
  return (
    <>
      <DataEncoderCenterLayout>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">Add Student Grade</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={clickHandler}>
              <Form.Group id="term">
                <Form.Label>Term</Form.Label>
                <Form.Control size="sm" as="select" ref={termRef} required onClick={loadHandler}>
                  {/* <option>first-term</option>
                  <option>sescond-term</option>
                  <option>third-term</option>
                  <option>fourth-term</option> */}

{term.map(item => {
      return (<option  >{item}</option>);
  })}
                </Form.Control>
              </Form.Group>
              <Form.Group id="grade">
                <Form.Label>Grade</Form.Label>
                <Form.Control size="sm" as="select" ref={gradeRef} required onClick={loadHandler}>>
                  {/* <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option> */}

{classes.map(item => {
      return (<option  >{item}</option>);
  })}
                </Form.Control>
              </Form.Group>
              <Form.Group id="section">
                <Form.Label>Section</Form.Label>
                <Form.Control size="sm" as="select" ref={sectionRef} required>
                  {/* <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option> */}

{sections.map(item => {
      return (<option  >{item}</option>);
  })}
                </Form.Control>
              </Form.Group>
              <Form.Group id="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control size="sm" as="select" ref={subjectRef} required>
                  {/* <option>Maths</option>
                  <option>Physics</option>
                  <option>English</option>
                  <option>Biology</option>
                  <option>Chemistry</option>
                  <option>Amharic</option>
                  <option>Physical Education</option>
                  <option>IT</option> */}
                  
                  {subject.map(item => {
      return (<option  >{item}</option>);
  })}
                </Form.Control>
              </Form.Group>

              <Form.Group id="file">
                {/* <label htmlFor="upload">Upload File</label>
                <input
                  type="file"
                  name="upload"
                  id="upload"
                  required
                  onChange={readUploadFile}
                /> */}
                <div className="input-group">
  {/* <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroupFileAddon01">
      Choose file 
    </span>
  </div> */}
  <div className="custom-file">
  
    <input
      type="file"
      className="custom-file-input"
      id="upload"

      onChange={readUploadFile}
      required
      aria-describedby="inputGroupFileAddon01"
      // onchange="document.getElementById('fileName').value = document.getElementById('upload').value;"
    />
    <label id = "fileName" className="custom-file-label" htmlFor="inputGroupFile01"  >
   
      {fileName}</label>
      
    
  </div>
  
</div>
              </Form.Group>
              <Button className="w-100" type="submit">
              <svg  style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
         Add Grade       </Button>
            </Form>
          </Card.Body>
        </Card>
      </DataEncoderCenterLayout>
    </>
  );
}
else {
  return(
    <Login/>
  )
}
}

export default AddGrade;
