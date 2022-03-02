
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddStudent from "../data-encoder/AddStudent";
import {Alert} from "react-bootstrap"
function AddStudentPage() {
  //const history = useNavigate();
  const [responses, setResponse] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  function addStudentHandler(studentData) {
    fetch(
      "https://student-monitoring.herokuapp.com/api/Student-Information",
      {
        method: "POST",
        body: JSON.stringify(studentData),
        headers: { "Content-Type": "application/json" },
      }
      
      )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        if (data.message == "Student Added successfully") {
          setSuccess(data.message);
          setError("");
        } else {
          setError(data.message);
          setSuccess("");}
        // alert(data.message);
        console.log(data);
        
        setResponse(data.message);

      });
     
    
    
  }
 
  return (
    <section>
       
      <AddStudent onAddStudent = {addStudentHandler} x={responses} />
      {error && <Alert variant="danger">{error}</Alert>}
       {success && <Alert variant="success">{success}</Alert>}
    </section>
  );
}

export default AddStudentPage;
