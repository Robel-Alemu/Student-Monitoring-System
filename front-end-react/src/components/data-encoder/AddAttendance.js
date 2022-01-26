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
  
    const date = new Date();

    const currentDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
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
            "https://student-monitoring.herokuapp.com/api/add-attendance",
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
              alert(data.message);
              console.log(data)
    }

            )


    }
    

    return(

<><DataEncoderCenterLayout><Card>
          <Card.Body>
            <h3 className="text-center mb-4">Add Student Attendance</h3>

            {/* {error && <Alert variant="danger">{error}</Alert>} */}
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
        <label htmlFor="upload">Upload File</label>
        <input
        type="file"
        name="upload"
        id="upload"
        required
        onChange={readUploadFile}
        
    />
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