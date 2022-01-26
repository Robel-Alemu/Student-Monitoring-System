
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { Form, FormControl, Button, Container, Row, Col} from "react-bootstrap"
import AllUsersList from "../admin/AllUsersList";
import DataEncoderLayout from "../layout/DataEncoderLayout";
import LayoutCenter from "../layout/LayoutCenter";
function AllUsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedUsers, setLoadedUsers] = useState([]);

   
  useEffect(() => {
    setIsLoading(true);
    fetch("https://student-monitoring.herokuapp.com/api/users")
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
          <LayoutCenter><p>Loading...</p></LayoutCenter>
        
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


