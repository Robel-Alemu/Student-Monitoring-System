
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./AdminNavigation.module.css";
import { useAuth } from "../../AuthContext/AuthContext";
import {Alert, Button,Nav, Navbar,NavDropdown,Container} from "react-bootstrap";


function Adminavigation() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()
    let name = localStorage.getItem("name")
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
    <Navbar.Brand href="#home">{name}</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav className={classes.nav} style={{textDecoration: "none"}}>
      <ul style={{textDecoration: "none"}}  >
             <li style={{textDecoration: "none"}}>
                <Link className={classes.links} style={{"color":"white"}} to="/">Home</Link>
              </li>
              <li>
               <Link style={{"color":"white"}} to="/broadcast-message">Announcement</Link>
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
               <Link style={{color:"black"}} to="/messages">Sent Messages</Link>
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
               <Link style={{color:"black"}} to="/view-grades">View Grade</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/view-attendance">View Attendance</Link>
              </NavDropdown.Item>
          
          
          
        </NavDropdown></li>

        <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>}
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link style={{color:"black"}} to="/update-profile">Update Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
          <Button variant="outline-dark" size="sm" onClick={handleLogout}>
          <svg style={{marginRight:""}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
  <path d="M7.5 1v7h1V1h-1z"/>
  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
</svg>  Log Out
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
