
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./DataEncoderNavigation.module.css";
import { useAuth } from "../../AuthContext/AuthContext";
import {Alert, Button,Nav, Navbar,NavDropdown,Container, Card} from "react-bootstrap";


function DataEncoderNavigation() {

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




<Navbar variant="dark" bg="dark" expand="lg" >
  <Container fluid>
    <Navbar.Brand style={{"color":"white"}} href="#home"> <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
</svg> {name}</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav  className={classes.nav}>
      <ul   >
             <li  >
                <Link className={classes.links} style={{"color":"white"}} to="/data-encoder">Home
                  {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
</svg> */}
</Link>
              </li>
              {/* <li>
               <Link className={classes.links} style={{"color":"white"}} to="/update-profile-d">Update Profile</Link>
               </li> */}
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Students"
        //   {<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16" >
        //   <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        //   <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
        //   <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
        // </svg> } 
          menuVariant="dark"
        >
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/add-student">Add Students</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/add-multiple-students">Add multiple Students</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/update-student">Update Student</Link>
              </NavDropdown.Item>
     
          </NavDropdown></li>
              
               
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Grade"
        //   {<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        //   <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
        // </svg>}
          menuVariant="dark"
        >
         
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/add-grade">Add Grades</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/update-grade">Update Grades</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/view-grades">View Grades</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/edit-grades">Edit Grades</Link>
              </NavDropdown.Item>
          
          
        </NavDropdown></li>
               <li ><NavDropdown  style={{color:"white"}}
          id="nav-dropdown-dark-example"
          title="Attendance"
        //   {<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">Attendance
        //   <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        //   <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
        // </svg>}
          menuVariant="dark"
        >
         
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/add-attendance">Add Attendance</Link>
              </NavDropdown.Item>
          <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/update-attendance">Update Attendance</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
               <Link className={classes.links} style={{color:"black"}} to="/view-attendance">View Attendance</Link>
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
            
          <Link className={classes.links} style={{"color":"black"}} to="/update-profile">Update Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item > 
              <Button variant="outline-dark" size="sm" onClick={handleLogout}>
              <svg style={{marginRight:""}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-power" viewBox="0 0 16 16">
  <path d="M7.5 1v7h1V1h-1z"/>
  <path d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z"/>
</svg> Log Out
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

export default DataEncoderNavigation;
