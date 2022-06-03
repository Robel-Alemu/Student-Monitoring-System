import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../AuthContext/AuthContext";
import { Link, useHistory } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, getUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
const  [loggedIn,setLoggedIn]= useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      const user = await getUser(emailRef.current.value);
      if (user.message === 'Account does not exist!'){
        console.log(user.message);
      }
      else{

        // try {
       
        //   const u = await auth.signInWithEmailAndPassword('jwt@gmail.com', '123456')
        //   console.log(u.user.email)
          
        
        //     const user = {
        //         id: 1, 
        //         uid: u.user.uid,
        //         email: u.user.email
        //       }
              
        //         jwt.sign({user}, 'secretkey', { expiresIn: '30000s' }, (err, token) => {
        //           res.json({
        //             token
        //           });
        //         });
             
        //  } catch (error) {
        //      res.sendStatus(403);
             
        //  }
        

        await login(emailRef.current.value, passwordRef.current.value);
        
          // console.log(loggedIn,"outside success")
          localStorage.setItem('name', user.name)
          localStorage.setItem('role', user.role)
        
         localStorage.setItem('email',user.email)
            if (user.role === 'Admin') history.push("/admin");
            else  history.push("/data-encoder");
            
                  console.log(user);
  
          
        }
      
      

     
    } catch {
      setError("failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <AuthLayout>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Log In
              </Button>
            </Form>
            {/* <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div> */}
          </Card.Body>
        </Card>
        {/* <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div> */}
      </AuthLayout>
    </>
  );
}
