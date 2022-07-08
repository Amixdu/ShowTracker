import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'



export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    console.log()
    e.preventDefault()
  }

  return (
    <div>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login Page</h2>
          {/* {auth.currentUser.email} */}
          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
            </Form.Group>

            <br></br>

            <Button disbaled={loading} className='w-100' type="submit">
              Sign up
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
