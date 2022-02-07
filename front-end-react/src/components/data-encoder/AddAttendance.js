import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import xlsx from "xlsx";

function AddAttendance(){
   
    
    const termRef = useRef();
    const gradeRef = useRef();
    const sectionRef = useRef();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();
    const [fileName, setFileName]= useState("Choose File");
    const date = new Date();

    const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    const year =`${date.getFullYear()}`;
    

    let attendance=[];

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
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
                console.log(attendance)
                setFileName((document.getElementById("upload").value).split("\\").pop()) 
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    function clickHandler(e){
    
   
    const enteredTerm = termRef.current.value;
    const enteredGrade = gradeRef.current.value;
    const enteredSection = sectionRef.current.value;


    const AttendanceEntryData = {
        
       
        term : enteredTerm,
        grade: enteredGrade,
        section: enteredSection,
        datePosted : currentDate,
        year: year,
        type: "attendance"
      
        
      };
      attendance.push(AttendanceEntryData);
  
// console.log(attendance);



        e.preventDefault();

        fetch(
            // https://student-monitoring.herokuapp.com
            "http://localhost:8080/api/add-attendance",
            {
              method: "POST",
              body: JSON.stringify(attendance),
              headers: { "Content-Type": "application/json" },
            }
            
           
           ).then((response) => {
            console.log(attendance)
              return response.json();
            })
            .then((data) => {
           
            if (data.message == "Attendance added successfully!") {setSuccess(data.message);
                setError("");}
        
                else {setError(data.message);
                        setSuccess("");}
        
                // alert(data.message);
        document.getElementById("upload").value = null;
    }

            )


    }
    

    return(

<><DataEncoderCenterLayout><Card>
          <Card.Body>
            <h3 className="text-center mb-4">Add Student Attendance</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={clickHandler}>
            <Form.Group id="term">
              <Form.Label>Term</Form.Label>
                <Form.Control size="sm" as="select" ref={termRef} required>
                  <option>first-term</option>
                  <option>sescond-term</option>
                  <option>third-term</option>
                  <option>fourth-term</option>
                </Form.Control>
              </Form.Group>
              <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
                <Form.Control size="sm" as="select" ref={gradeRef} required>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </Form.Control>
              </Form.Group>
              <Form.Group id="section">
              <Form.Label>Section</Form.Label>
                <Form.Control size="sm" as="select" ref={sectionRef} required>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
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
      Upload
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
    />
    <label className="custom-file-label" htmlFor="inputGroupFile01">
    {fileName}
    </label>
  </div>
</div>
        </Form.Group>
              <Button  className="w-100" type="submit">
                Add Attendance
              </Button>
            </Form>
          </Card.Body>
        </Card></DataEncoderCenterLayout>
    </>








    )
};

export default AddAttendance;