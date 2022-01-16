import React from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

import Card from '../ui/Card';
import classes from "./LogInPage.module.css";
const LogInPage = (props) => {

    
        const { email, 
                setEmail, 
                password, 
                setPassword, 
                handleLogin 
         } = props;
   

  


    

    return (
        <Card>
        <div className={classes.Form}>
        <div className={classes.control}>
        <label>Email</label>
        <input
        type="text"
        autoFocus
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        </div>
        
        <div className={classes.control}>
       
        <label> Password </label>
        <input
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <div className={classes.actions}>
        <button onClick={handleLogin} >LogIn</button>
        </div>
        
        </div>
        </Card>
           
        
    );
};

export default LogInPage;