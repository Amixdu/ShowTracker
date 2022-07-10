import { Alert } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import Loader from './Loader'


import { useAuth } from './contexts/AuthContext'
// import { auth } from "./firebase"
// import { createUserWithEmailAndPassword } from "firebase/auth";


export default function AdminAdd() {
  const nameRef = useRef()
  const descriptionRef = useRef()
  const dateRef = useRef()
  const imageRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { signup, currentUser } = useAuth()
  
  async function handleSubmit(e){
    e.preventDefault()

    setError('')

    // console.log(emailRef.current.value)
    // console.log(passwordRef.current.value)

    // If checks passed, signup

    try{
      setLoading(true)
    //   await signup(showNameRef.current.value, passwordRef.current.value)
      console.log('Signup Success')
      history.push("/home")
    }
    catch(error){
      console.log(error)
      setError("Signup Failed")
    }

    setLoading(false)
  }


  return (
    <div>

      {loading && <Loader />}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Shows</h2>
          {error && <Alert variant='danger'>{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id="name" className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="description" className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descriptionRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="date" className='mb-3'>
              <Form.Label>Air Date</Form.Label>
              <Form.Control type='date' ref={dateRef} required></Form.Control>
            </Form.Group>

            <Form.Group id="image">
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' accept="image/png, image/jpeg" ref={dateRef} required></Form.Control>
            </Form.Group>


            <br></br>

            <Button disbaled={loading} className='w-100' type="submit">
              Sign up
            </Button>

          </Form>
        </Card.Body>
      </Card>
      
      <div className="w-100 text-center mt-2" style={{ color:'white' }}>
        Want to update a show instead? <Link to="/admin-update" style={{ color:'white' }}> Update </Link>
      </div>
      
    </div>
  )
}
