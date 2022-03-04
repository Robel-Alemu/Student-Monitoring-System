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
  // let subjectNormal = ['maths','physics','chemistry'];
  // let subjectArt = ['history','business','art'];

  // let selectedSubjects =[];

  // if(gradeRef.current.value == 9 && gradeRef.current.value == 10 && gradeRef.current.value == 11){
  //     selectedSubjects = [...subjectNormal];

  // }
  // else
  // selectedSubjects = [...subjectArt];
  const [fileName, setFileName]= useState("Choose File");

  let students = [];

  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        console.log(sheetName);
        const worksheet = workbook.Sheets[sheetName];
        const json = xlsx.utils.sheet_to_json(worksheet);
        console.log(json);

        students = [...json];
        console.log(students);
        
        setFileName((document.getElementById("upload").value).split("\\").pop()) 
      };
      reader.readAsArrayBuffer(e.target.files[0]);
      
    }
  };

  function clickHandler(e) {
   

    console.log(students);
   

    e.preventDefault();

    fetch(
      // https://student-monitoring.herokuapp.com
      "http://localhost:8080/api//add-multiple-students",
      {
        method: "POST",
        body: JSON.stringify(students),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        console.log(students);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Students added successfully!") {setSuccess(data.message);
        setError("");}

        else {setError(data.message);
                setSuccess("");}

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
              </Form.Group>
              <Button className="w-100" type="submit">
                Add
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
