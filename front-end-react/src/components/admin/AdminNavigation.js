// import { Navbar, Nav} from "react-bootstrap";
// import { Link } from 'react-router-dom';
// import {Col, Row, Container } from "react-bootstrap"
// function AdminNavigation() {
//   return (

// <Container>
//     <Row>
//       <Col sm={8}>
//       <Navbar bg="dark" variant="dark">
//       {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
//      <Nav className="mr-auto">

//      <Link to="/"> <Nav.Link>Home</Nav.Link></Link>

//         <Link to="/add-user">
//           <Nav.Link>Add User</Nav.Link>
//         </Link>

//         {/* <LinkContainer to="/broadcast">
//           <Nav.Link></Nav.Link>
//         </LinkContainer> */}
//       </Nav>
//     </Navbar>
//       </Col>
//       <Col sm={4}><div className="w-100 text-center mt-2">
//         <Button variant="link" onClick={handleLogout}>
//           Log Out
//         </Button>
//       </div></Col>
//     </Row>
//     </Container>

//   );
// }

// export default AdminNavigation;
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./AdminNavigation.module.css";
import { useAuth } from "../../AuthContext/AuthContext";
import {Alert, Button} from "react-bootstrap";


function Adminavigation() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
  
    async function handleLogout() {
      setError("")
  
      try {
        await logout()
        history.push("/login")
      } catch {
        setError("Failed to log out")
      }
    }

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
      <Button variant="outline-dark" size="sm" onClick={handleLogout}>
          Log Out
        </Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/add-user">Add User</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              {/* <li>
                <Link to="/add-student">Add Student</Link>
              </li> */}
              <li>
                <Link to="/broadcast-message">Broadcast Message</Link>
              </li>
              <li>
                <Link to="/all-students">Students</Link>
              </li>
              <li>
                <Link to="/update-profile">Update Profile</Link>
              </li>

            </ul>
          </nav>
       
    
    </header>
  );
}

export default Adminavigation;
