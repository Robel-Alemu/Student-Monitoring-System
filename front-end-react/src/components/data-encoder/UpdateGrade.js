import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import DataEncoderCenterLayout from "../layout/DataEncoderCenterLayout";
import Layout from "../layout/Layout";
import LayoutCenter from "../layout/LayoutCenter";

import xlsx from "xlsx";

function UpdateGrade(){
   
    const subjectRef = useRef();
    const termRef = useRef();
    const gradeRef = useRef();
    const sectionRef = useRef();
  const [error,setError] = useState();
  const [success,setSuccess] = useState();
  const [fileName, setFileName]= useState("Choose File");

    // let subjectNormal = ['maths','physics','chemistry'];
    // let subjectArt = ['history','business','art'];
    
    // let selectedSubjects =[];

    // if(gradeRef.current.value == 9 && gradeRef.current.value == 10 && gradeRef.current.value == 11){
    //     selectedSubjects = [...subjectNormal];

    // }
    // else
    // selectedSubjects = [...subjectArt];
    



    let grades=[];

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet);
                console.log(json);
                
                grades = [...json];
                console.log(grades)
                setFileName((document.getElementById("upload").value).split("\\").pop()) 
                
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    }

    function clickHandler(e){
    
    const enteredSubject = subjectRef.current.value;
    const enteredTerm = termRef.current.value;
    const enteredGrade = gradeRef.current.value;
    const enteredSection = sectionRef.current.value;


    const gradeEntryData = {
        
       
        term : enteredTerm,
        grade: enteredGrade,
        section: enteredSection,
        subject: enteredSubject
        
      };
      grades.push(gradeEntryData);
  
console.log(grades);



        e.preventDefault();

        fetch
        (
            // https://student-monitoring.herokuapp.com
            "http://localhost:8080/api/update-grade",
            {
              method: "POST",
              body: JSON.stringify(grades),
              headers: { "Content-Type": "application/json" },
            }
            
           
           ).then((response) => {
            console.log(grades)
              return response.json();
            })
            .then((data) => {
          
            if (data.message == "Grades Updated successfully!") {setSuccess(data.message);
                setError("");}
        
                else {setError(data.message);
                        setSuccess("");}
        document.getElementById("upload").value = null;
    }


            )
            

    }


    

    return(

<><DataEncoderCenterLayout><Card>
          <Card.Body>
            <h3 className="text-center mb-4">Update Student Grades</h3>

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
              <Form.Group id="subject">
              <Form.Label>Subject</Form.Label>
                <Form.Control size="sm" as="select" ref={subjectRef} required>
                
                  <option>Maths</option>
                  <option>physics</option>
                  <option>english</option>
                  <option>amharic</option>
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
                Update Grades
              </Button>
            </Form>
          </Card.Body>
        </Card></DataEncoderCenterLayout>
    </>








    )
};

export default UpdateGrade;