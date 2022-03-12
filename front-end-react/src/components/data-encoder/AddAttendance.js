import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import xlsx from "xlsx";
import Login from "../authentication/Login";

function AddAttendance() {
  const termRef = useRef();
  const gradeRef = useRef();
  const sectionRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [fileName, setFileName] = useState("Choose File");
  
  const [term, setTerm] = useState(["Select Term"])
  const [sections,setSections]=useState(["Select Section"]);
  const [classes,setClasses] = useState(["Select Grade"]);
  const terms = ["first-term", "second-term", "third-term", "fourth-term"];
  let userRole = localStorage.getItem("role");
  const token = localStorage.getItem("token")
  const date = new Date();

  // const currentDate = `${date.getFullYear()}-${
  //   date.getMonth() + 1
  // }-${date.getDate()}`;
  const currentDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
  const year = `${date.getFullYear()}`;

  const [attendances, setAttendance] = useState();
  let attendance = [];

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      setFileName(e.target.files[0].name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        console.log(worksheet);
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);

        attendance = [...json];
        setAttendance(attendance);
        console.log(attendances, "use state");
        //     console.log(attendance)
        //     setFileName((document.getElementById("upload").value).split("\\").pop())
         };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    };


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
          // setClasses(gradesArray)
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
        console.log(sections,"*********");
        sections.forEach(element => {
          console.log(element)
        });
        
        // setResponse(data.message);
  
      });
      setTerm(terms)
    }
    

    function clickHandler(e) {
      // const enteredTerm = termRef.current.value;
      const enteredGrade = gradeRef.current.value;
      const enteredSection = sectionRef.current.value;

      const AttendanceEntryData = {
        // term: enteredTerm,
        grade: enteredGrade,
        section: enteredSection,
        datePosted: currentDate,
        year: year,
        // type: "attendance"
      };
      setAttendance(attendances.push(AttendanceEntryData));
      console.log(attendances, "use state after add");
      attendance.push(AttendanceEntryData);

      // console.log(attendance);

      e.preventDefault();

      fetch(
        // https://student-monitoring.herokuapp.com
        "http://localhost:8080/api/add-attendance",
        {
          method: "POST",
          body: JSON.stringify(attendances),
          headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
        }
      )
        .then((response) => {
          console.log(attendance);
          return response.json();
        })
        .then((data) => {
          if (data.message == "Attendance added successfully!") {
            setSuccess(data.message);
            setError("");
            setTimeout(() => {  setSuccess(""); }, 1000);
          } else {
            setError(data.message);
            setSuccess("");
            setTimeout(() => {  setError(""); }, 1000);
          }

          // alert(data.message);
          document.getElementById("upload").value = null;
          setFileName("Choose File")
          // setTerm(["Select Term"])
          setClasses(["Select Grade"])
          setSections(["Select Section"])
        });
    }
    if (userRole == "Data Encoder") {

    return (
      <>
        <DataEncoderCenterLayout>
          <Card >
            <Card.Body >
              <h3 className="text-center mb-4">Add Student Attendance</h3>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <Form onSubmit={clickHandler}>
                {/* <Form.Group id="term">
                  <Form.Label>Term</Form.Label>
                  <Form.Control size="sm" as="select" ref={termRef} required onClick={termHandler}>
             
                    {term.map(item => {
      return (<option  >{item}</option>);})}
                  </Form.Control>
                </Form.Group> */}
                <Form.Group id="grade">
                  <Form.Label>Grade</Form.Label>
                  <Form.Control size="sm" as="select" ref={gradeRef} required onClick={termHandler}>
                
                    
{classes.map(item => {
      return (<option  >{item}</option>);
  })}
                  </Form.Control>
                </Form.Group>
                <Form.Group id="section">
                  <Form.Label>Section</Form.Label>
                  <Form.Control size="sm" as="select" ref={sectionRef} required>
                 
                                                   
{sections.map(item => {
      return (<option  >{item}</option>);
  })}
                  </Form.Control>
                </Form.Group>

                <Form.Group id="file">
                 
                  <div className="input-group">
                   
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="upload"
                        onChange={readUploadFile}
                        required
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile01"
                      >
                        {fileName}
                      </label>
                    </div>
                  </div>
                </Form.Group>
                <Button className="w-100" type="submit">
                <svg  style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>Add Attendance 
        
                </Button>
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
export default AddAttendance;
