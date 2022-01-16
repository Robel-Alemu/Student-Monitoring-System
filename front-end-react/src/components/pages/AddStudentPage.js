
// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddStudent from "../data-encoder/AddStudent";

function AddStudentPage() {
  //const history = useNavigate();
  const [responses, setResponse] = useState();
  function addStudentHandler(studentData) {
    fetch(
      "http://localhost:8080/api/Student-Information",
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
        alert(data.message);
        console.log(data);
        
        setResponse(data);

      });
     
    // ).then(() => {
    //   history("/");
    // });
    
  }
 
  return (
    <section>
      
      <AddStudent onAddStudent = {addStudentHandler} x={responses} />
    </section>
  );
}

export default AddStudentPage;
