import { Alert } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { Form, Button, Card, Container } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Loader from './Loader'
import { useAuth } from './contexts/AuthContext'


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { signup } = useAuth()
  
  async function handleSubmit(e){
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    setError('')

    // If checks passed, signup

    try{
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/home")
    }
    catch(error){
      console.log(error)
      setError("Signup Failed")
    }

    setLoading(false)
  }


  return (
    <div style={{ backgroundColor:'#1569C7' }}>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>

          {loading && <Loader backgCol={'light'}/>}

          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Signup Page</h2>
              
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

                <Button disabled={loading} className='w-100' type="submit">
                  Sign up
                </Button>

              </Form>
            </Card.Body>
          </Card>
          
          <div className="w-100 text-center mt-2" style={{ color:'white' }}>
            Already have an account? <Link to="/login" style={{ color:'white' }}> Login </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
