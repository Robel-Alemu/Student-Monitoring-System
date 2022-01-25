
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./DataEncoderNavigation.module.css";
import { useAuth } from "../../AuthContext/AuthContext";
import {Alert, Button} from "react-bootstrap";


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
                <Link to="/data-encoder">Home</Link>
              </li>
             
              <li>
                <Link to="/add-student">Add Student</Link>
              </li>
              <li>
                <Link to="/update-student">Update Student</Link>
              </li>
              
              
              <li>
                <Link to="/update-profile-d">Update Profile</Link>
              </li>
              <li >
                <Link style={{"color":"white"}} to="/add-grade">Add Grade</Link>
              </li>
              <li >
                <Link style={{"color":"white"}} to="/add-attendance">Add Attendance</Link>
              </li>

            </ul>
          </nav>
       
    
    </header>
  );
}

export default DataEncoderNavigation;
