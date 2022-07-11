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
  const [imageUrl, setImageUrl] = useState()
  const history = useHistory()

  const { uploadImage, currentUser } = useAuth()
  
  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    
    console.log(nameRef.current.value)
    console.log(descriptionRef.current.value)
    console.log(dateRef.current.value)
    console.log(imageRef.current.files[0])

    try{
        const file = imageRef.current.files[0]
        setImageUrl(await uploadImage(file))
    }
    catch{
        console.log(error)
        setError("Upload Failed")
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
              <Form.Control type='file' accept="image/png, image/jpeg" ref={imageRef}></Form.Control>
            </Form.Group>


            <br></br>

            <Button disbaled={loading} className='w-100' type="submit">
              Add
            </Button>

          </Form>
        </Card.Body>
      </Card>
      
      <div className="w-100 text-center mt-2" style={{ color:'white' }}>
        <Link to="/home" style={{ color:'white' }}> Back to Home </Link>
      </div>
      
    </div>
  )
}
