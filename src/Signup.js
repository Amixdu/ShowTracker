import { Alert } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

// import { useAuth } from './contexts/AuthContext'
import { auth } from "./firebase"
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // const { signup } = useAuth()
  const [currentU, setCurrentU] = useState()

  
  async function handleSubmit(e){
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    setError('')

    // console.log(emailRef.current.value)
    // console.log(passwordRef.current.value)

    // If checks passed, signup

    try{
      const user = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      setCurrentU(user)
    }
    catch(error){
      console.log(error.message)
    }

    setLoading(false)

  }


  return (
    <div>

      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Signup Page</h2>
          {JSON.stringify(currentU)}
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
        Already have an account?
      </div>
      
    </div>
  )
}
