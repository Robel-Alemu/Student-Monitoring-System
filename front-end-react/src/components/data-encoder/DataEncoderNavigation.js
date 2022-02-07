
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./DataEncoderNavigation.module.css";
import { useAuth } from "../../AuthContext/AuthContext";
import {Alert, Button,Nav, Navbar,NavDropdown,Container} from "react-bootstrap";


function DataEncoderNavigation() {

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
      <Nav className={classes.nav}>
      <ul  >
             <li >
                <Link style={{"color":"white"}} to="/data-encoder">Home</Link>
              </li>
              <li>
               <Link style={{"color":"white"}} to="/update-profile-d">Update Profile</Link>
               </li>
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Students"
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/add-student">Add Students</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/update-student">Update Student</Link>
              </NavDropdown.Item>
     
          </NavDropdown></li>
              
               
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Grade"
          menuVariant="dark"
        >
         
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/add-grade">Add Grades</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/update-grade">Update Grades</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/view-grades">View Grades</Link>
              </NavDropdown.Item>
          
          
        </NavDropdown></li>
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Attendance"
          menuVariant="dark"
        >
         
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/add-attendance">Add Attendance</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/update-attendance">Update Attendance</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/view-attendance">View Attendance</Link>
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

    // <header className={classes.header}>
    //   <div className={classes.logo}>
    //   <Button variant="outline-dark" size="sm" onClick={handleLogout}>
    //       Log Out
    //     </Button>
    //     {error && <Alert variant="danger">{error}</Alert>}
    //   </div>
      
    //       <nav>
    //         <ul>
    //           <li>
    //             <Link to="/data-encoder">Home</Link>
    //           </li>
             
    //           <li>
    //             <Link to="/add-student">Add Student</Link>
    //           </li>
    //           <li>
    //             <Link to="/update-student">Update Student</Link>
    //           </li>
    //           <li>
    //             <Link to="/update-attendance">Update Attendance</Link>
    //           </li>
    //           <li>
    //             <Link to="/view-attendance">View Attendance</Link>
    //           </li>
              
              
    //           <li>
    //             <Link to="/update-profile-d">Update Profile</Link>
    //           </li>
    //           <li >
    //             <Link style={{"color":"white"}} to="/add-grade">Add Grades</Link>
    //           </li>
    //           <li >
    //             <Link style={{"color":"white"}} to="/update-grade">Update Grades</Link>
    //           </li>
    //           <li >
    //             <Link style={{"color":"white"}} to="/add-attendance">Add Attendance</Link>
    //           </li>

    //         </ul>
    //       </nav>
       
    
    // </header>
  );
}

export default DataEncoderNavigation;
