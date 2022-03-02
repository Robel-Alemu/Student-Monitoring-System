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
import {Alert, Button,Nav, Navbar,NavDropdown,Container} from "react-bootstrap";


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


<Navbar variant="dark" bg="dark" expand="lg">
  <Container fluid>
    <Navbar.Brand href="#home">{currentUser.email}</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav className={classes.nav} style={{textDecoration: "none"}}>
      <ul style={{textDecoration: "none"}}  >
             <li style={{textDecoration: "none"}}>
                <Link className={classes.links} style={{"color":"white"}} to="/">Home</Link>
              </li>
              <li>
               <Link style={{"color":"white"}} to="/broadcast-message">Broadcast Announcement</Link>
               </li>
              {/* <li>
               <Link style={{"color":"white"}} to="/add-class">Add Class</Link>
               </li>
              <li>
               <Link style={{"color":"white"}} to="/update-class">Update Class</Link>
               </li> */}
               <li >
                 <NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Users"
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/add-user">Add User</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/users">View Users</Link>
              </NavDropdown.Item>
     
          </NavDropdown></li>
               <li >
                 <NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Class"
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/add-class">Add Class</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/update-class">Update Class</Link>
              </NavDropdown.Item>
     
          </NavDropdown></li>
              
               <li >
                 <NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Message"
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/send-message">Send Message</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/users">Sent Messages</Link>
              </NavDropdown.Item>
     
          </NavDropdown></li>
              
               
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Student"
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/all-students">View Students</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/view-grades-admin">View Grade</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/view-attendance-admin">View Attendance</Link>
              </NavDropdown.Item>
          
          
          
        </NavDropdown></li>

        <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Profile"
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/update-profile">Update Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
          <Button variant="outline-dark" size="sm" onClick={handleLogout}>
          Log Out
       </Button>
              </NavDropdown.Item>
     
          </NavDropdown></li>
               </ul>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}

export default Adminavigation;
