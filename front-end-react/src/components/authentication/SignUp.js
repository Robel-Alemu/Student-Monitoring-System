import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../AuthContext/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { app } from "../../firebase";
import AuthLayout from "../layout/AuthLayout";

export default function Signup(props) {
  const nameRef = useRef()
  const phoneRef = useRef()
  const roleRef = useRef()

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()


  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setError("Passwords do not match")
  //   }

  //   try {
  //     setError("")
  //     setLoading(true)
  //     const account = await signup(emailRef.current.value, passwordRef.current.value)
  //   //  const user = account.user;

  //   //  await app.firestore.collection("Users").doc().set({
        
  //   //     userID: user.userID,
  //   //     email : emailRef.current.value,
  //   //     password : passwordRef.current.value
  //   //    })
  //     history.push("/")
  //   } catch (err){
  //       setError(err);
  //   }

  //   setLoading(false)
  // }


  function submitHandler(event) {
   
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredRole = roleRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    const userData = {
      name: enteredName,
      phone: enteredPhone,
      role : enteredRole,
      email: enteredEmail,
      password : enteredPassword
    };

    props.onSignup(userData);
  }

  return (
    <><AuthLayout ><Card >
    <Card.Body >
      
      <h4 className="text-center mb-4">Sign Up</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={submitHandler}>
      <Form.Group id="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" ref={nameRef} size="sm" required />
        </Form.Group>
        <Form.Group id="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" size="sm" ref={phoneRef} required />
        </Form.Group>
        <Form.Group id="role">
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" size="sm" ref={roleRef} required />
        </Form.Group>
        <Form.Group id="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" size="sm" ref={emailRef} required />
        </Form.Group>
        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" size="sm" ref={passwordRef} required />
        </Form.Group>
        <Form.Group id="password-confirm">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control type="password" size="sm" ref={passwordConfirmRef} required />
        </Form.Group>
        <Button disabled={loading} className="w-100" type="submit">
          Sign Up
        </Button>
      </Form>
    </Card.Body>
  </Card>
  <div className="w-100 text-center mt-2">
    Already have an account? <Link to="/login">Log In</Link>
  </div></AuthLayout>
      
    </>
  )
}
