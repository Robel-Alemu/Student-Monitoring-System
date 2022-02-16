import StudentList from "../admin/StudentList";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Form, FormControl, Button, Container, Row, Col, Spinner} from "react-bootstrap"
function AllStudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedStudents, setLoadedStudents] = useState([]);

   
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "http://localhost:8080/api/Student-Information"
      // "https://student-monitoring.herokuapp.com/api/Student-Information"
      )
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        const students = [];

        for (const key in data) {
          const student = {
            id: key,
            ...data[key],
          };
          students.push(student);
        }
        setIsLoading(false);
        setLoadedStudents(students);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
         <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...please wait</span>
  
  </Button>
      </section>
    );
  }

  return (
      <section>
        <h1>All Students</h1>




         <StudentList students={loadedStudents} />
      
      
     
      </section>

  );
}

export default AllStudentsPage;


