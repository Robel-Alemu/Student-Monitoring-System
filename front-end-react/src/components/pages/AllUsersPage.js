
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Form, FormControl, Button, Container, Row, Col,Spinner} from "react-bootstrap"
import AllUsersList from "../admin/AllUsersList";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import LayoutCenter from "../layout/LayoutCenter";
function AllUsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);
  const token = localStorage.getItem("token")
   
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "http://localhost:8080/api/users",
      // "https://student-monitoring.herokuapp.com/api/users",
       {
      method: "GET",
      
      headers: { "Content-Type": "application/json" , "Authorization":"Bearer " + token},
    })
      .then((response) => {
        console.log(response.body);
        return response.json();
      })
      .then((data) => {
        const users = [];

        for (const key in data) {
          const user = {
            id: key,
            ...data[key],
          };
          users.push(user);
        }
        setIsLoading(false);
        setLoadedUsers(users);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
          <LayoutCenter>  <Button variant="primary" disabled>
    <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    />
    <span className="visually-hidden">Loading...please wait</span>
  
  </Button></LayoutCenter>
        
      </section>
    );
  }

  return (
      <section>





        <LayoutCenter><h1>All Users</h1>




<AllUsersList users={loadedUsers} /></LayoutCenter>
        
      
      
     
      </section>

  );
}

export default AllUsersPage;


