import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";
import Login from "../authentication/Login"
import xlsx from "xlsx";

function AddMultipleStudents() {
//   const subjectRef = useRef();
//   const termRef = useRef();
//   const gradeRef = useRef();
//   const sectionRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  let userRole = localStorage.getItem("role")
  const token = localStorage.getItem("token")
  const [students,setStudents] = useState()
  // let subjectNormal = ['maths','physics','chemistry'];
  // let subjectArt = ['history','business','art'];

  // let selectedSubjects =[];

  // if(gradeRef.current.value == 9 && gradeRef.current.value == 10 && gradeRef.current.value == 11){
  //     selectedSubjects = [...subjectNormal];

  // }
  // else
  // selectedSubjects = [...subjectArt];
  const [fileName, setFileName]= useState("Choose File");

  // let students = [];

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

        // students = [...json];
      setStudents(json);
        
       
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      
    }
  };
  console.log(students,"***************");

  function clickHandler(e) {
   
    e.preventDefault();
    console.log(students,"///////////");
   

  

    fetch(
      // https://student-monitoring.herokuapp.com
      "http://localhost:8080/api/add-multiple-students",
      {
        method: "POST",
        body: JSON.stringify(students),
        headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
      }
    )
      .then((response) => {
        console.log(students);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Students added successfully!") {setSuccess(data.message);
        setError("");
        setTimeout(() => {  setSuccess(""); }, 2000);}

        else {setError(data.message);
                setSuccess("");
                setTimeout(() => {  setError(""); }, 2000);}

        // alert(data.message);
        
        document.getElementById("upload").value = null;
      });
    

  }

  if (userRole == "Data Encoder"){

  return (
    <>
      <DataEncoderCenterLayout>
        <Card>
          <Card.Body>
            <h3 className="text-center mb-4">Add Multiple Students and Parents</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={clickHandler}>
          

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
      // onchange="document.getElementById('fileName').value = document.getElementById('upload').value;"
    />
    <label id = "fileName" className="custom-file-label" htmlFor="inputGroupFile01"  >
   
      {fileName}</label>
      
    
  </div>
  
</div>
{/* 
<div className="input-group">
  <div className="input-group-prepend">
    <span className="input-group-text" id="inputGroupFileAddon01">
      Upload
    </span>
  </div>
  <div className="custom-file">
    <input
      type="file"
      className="custom-file-input"
      id="upload"
      onChange={readUploadFile}
      aria-describedby="inputGroupFileAddon01"
    />
    <label className="custom-file-label" htmlFor="inputGroupFile01">
      Choose file
    </label>
  </div>
</div> */}
              </Form.Group>
              <Button className="w-100" type="submit">
              <svg style={{marginRight:"10px"}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
</svg> Add Students 
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

export default AddMultipleStudents;
