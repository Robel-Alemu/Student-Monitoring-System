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
  const[grade,setGrade] = useState();

  const [term, setTerm] = useState(["Select Term"])
  const [sections,setSections]=useState(["Select Section"]);
  const [classes,setClasses] = useState(["Select Grade"]);
  const [subject,setSubject] = useState(["Select Subject"]);
  
  const subjectsOf11And12 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "Physical Education", "IT", "Geography", "History", "Economics" ];
  const subjectsOf9And10 = ["Amharic", "English", "Maths", "Physics", "Biology", "Chemistry", "Civics", "Physical Education", "IT"];
  
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
      else setSubject(subjectsOf11And12)
      console.log(classArray[0].section);
      console.log(sections,"*********");
      sections.forEach(element => {
        console.log(element)
      });
      
      // setResponse(data.message);

    });
    setTerm(terms)
  }



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
                setGrade(grades);
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
      setGrade(grade.push(gradeEntryData));
      grades.push(gradeEntryData);
  
console.log(grades);



        e.preventDefault();

        fetch
        (
            // https://student-monitoring.herokuapp.com
            "http://localhost:8080/api/update-grade",
            {
              method: "PUT",
              body: JSON.stringify(grade),
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
        setFileName("Choose File")
        setTerm(["Select Term"])
        setClasses(["Select Grade"])
        setSections(["Select Section"])
        setSubject(["Select Subject"])
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
                <Form.Control size="sm" as="select" ref={termRef} required onClick={termHandler}>
                  {/* <option>first-term</option>
                  <option>sescond-term</option>
                  <option>third-term</option>
                  <option>fourth-term</option> */}
{term.map(item => {
      return (<option  >{item}</option>);})}

                </Form.Control>
              </Form.Group>
              <Form.Group id="grade">
              <Form.Label>Grade</Form.Label>
                <Form.Control size="sm" as="select" ref={gradeRef} required onClick={termHandler}>>
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
                  <option>physics</option>
                  <option>english</option>
                  <option>amharic</option> */}

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