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
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-dark-example" />
    <Navbar.Collapse id="navbar-dark-example">
      <Nav className={classes.nav}>
      <ul  >
             <li >
                <Link style={{"color":"white"}} to="/">Home</Link>
              </li>
              <li>
               <Link style={{"color":"white"}} to="/broadcast-message">Broadcast Message</Link>
               </li>
               <li  >
                 <Link style={{"color":"white"}} to="/add-user">Add User</Link>
          </li>
               <li  >
                 <Link style={{"color":"white"}} to="/users">Users</Link>
               </li>
               <li  >
               <Link to="/all-students">Students</Link>
               </li>
               <li  >
               <Link to="/view-grades">View Grades</Link>
               </li>
               
               <li ><NavDropdown  style={{"color":"white"}}
          id="nav-dropdown-dark-example"
          title="Dropdown"
          menuVariant="dark"
        >
          <NavDropdown.Item > <li style={{"color":"Black"}} >
               <Link to="/view-attendance-admin">View Attendance</Link>
               </li></NavDropdown.Item>
          <NavDropdown.Item >Another action</NavDropdown.Item>
          <NavDropdown.Item >Something</NavDropdown.Item>
          <NavDropdown.Divider />
          
        </NavDropdown></li>
               </ul>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


// <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
//   <Container>

//   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//   <Navbar.Collapse id="responsive-navbar-nav">
//     <Nav className="me-auto">
//     <Nav.Link color="white"> </Nav.Link>
//     <Nav.Link > <Link to="/users">
//                 <Button color="white" variant="dark" style={{border: "0px"}} size="sm">
//                   My Account
//                 </Button></Link></Nav.Link>
//                 <Nav.Link ></Nav.Link>
//       <NavDropdown title="User" id="collasible-nav-dropdown" variant="dark" color="white">
      
//         <NavDropdown.Item> <Link style={{color: 'white'}, {textDecoration: "none"}} to="/add-user">Add User</Link></NavDropdown.Item>
//         <NavDropdown.Item color="black"> <Link style={{color: 'white'}, {textDecoration: "none"}} to="/users">Users</Link></NavDropdown.Item>
//         <NavDropdown.Item color="black"><Link style={{color: 'white'}, {textDecoration: "none"}} to="/update-profile">Update Profile</Link></NavDropdown.Item>
//         <NavDropdown.Item color="black"><Button variant="outline-dark" style={{border: "0px"}} size="sm" onClick={handleLogout}>
//            Log Out
//          </Button></NavDropdown.Item>
//         <NavDropdown.Item color="black"> <Link to="/users">
//                 <Button color="white" variant="outline-dark" style={{border: "0px"}} size="sm">
//                   <span>My Account</span>
//                 </Button></Link></NavDropdown.Item>
       
//       </NavDropdown>
//     </Nav>
   
//   </Navbar.Collapse>
//   </Container>
// </Navbar>

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
    //             <Link to="/">Home</Link>
    //           </li>
    //           <li>
    //             <Link to="/add-user">Add User</Link>
    //           </li>
    //           <li>
    //             <Link to="/users">Users</Link>
    //           </li>
    //           {/* <li>
    //             <Link to="/add-student">Add Student</Link>
    //           </li> */}
    //           <li>
    //             <Link to="/broadcast-message">Broadcast Message</Link>
    //           </li>
    //           <li>
    //             <Link to="/all-students">Students</Link>
    //           </li>
    //           <li>
    //             <Link to="/update-profile">Update Profile</Link>
    //           </li>

    //         </ul>
    //       </nav>
       
    
    // </header>
  );
}

export default Adminavigation;
