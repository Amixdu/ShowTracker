import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from './contexts/AuthContext'
// import { auth } from "./firebase"
// import { signInWithEmailAndPassword } from "firebase/auth";


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { login } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')

    // If checks passed, signup

    try{
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      console.log("Success")
      setSuccess(true)
      history.push("/home")
    }
    catch(error){
      console.log(error)
      setSuccess(false)
      setError("Login Failed")
    }

    setLoading(false)
  }

  return (
    <div>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login Page</h2>
          {/* {auth.currentUser.email} */}
          {success? <Alert>Sucess</Alert> : error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>

            <br></br>

            <Button disbaled={loading} className='w-100' type="submit">
              Login
            </Button>

          </Form>
        </Card.Body>
      </Card>
  
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup"> Signup </Link>
      </div>
      
    </div>
  )
}
