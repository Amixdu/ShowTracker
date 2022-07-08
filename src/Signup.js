import { Alert } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

// import { useAuth } from './contexts/AuthContext'
// import { auth } from "./firebase"

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  // const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [currentU, setCurrentU] = useState()

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDqKg8tQrdttBf1PIagX6gKoWVFYJLRmVs",
    authDomain: "auth-showtracker.firebaseapp.com",
    databaseURL: "https://console.firebase.google.com/u/2/project/auth-showtracker/database/auth-showtracker-default-rtdb/data/~2F",
    projectId: "auth-showtracker",
    storageBucket: "auth-showtracker.appspot.com",
    messagingSenderId: "1087708722286",
    appId: "1:1087708722286:web:675e143112fbce48e7e27f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  
  function handleSubmit(e){
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords do not match')
    }

    setError('')

    console.log(emailRef.current.value)
    console.log(passwordRef.current.value)

    // If checks passed, signup
    
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        // Signed in 
        console.log(userCredential)
      })
      .catch((error) => {
        console.log('Nope')
      });


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
