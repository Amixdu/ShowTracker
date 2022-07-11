import { Alert } from 'react-bootstrap'
import React, { useRef, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'

import { useAuth } from './contexts/AuthContext'
// import { auth } from "./firebase"
// import { createUserWithEmailAndPassword } from "firebase/auth";


export default function AdminAdd() {
  const nameRef = useRef()
  const authorRef = useRef()
  const descriptionRef = useRef()
  const dateRef = useRef()
  const imageRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [imageUrl, setImageUrl] = useState()


  const { uploadImage, currentUser, pushShow } = useAuth()
  
  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)
    
    const rand = Math.floor((Math.random() * 100) + 1)
    const id = nameRef.current.value + authorRef.current.value + dateRef.current.value + rand

    try{
        const file = imageRef.current.files[0]
        setImageUrl(await uploadImage(file))
        await pushShow(id, nameRef.current.value, authorRef.current.value, descriptionRef.current.value, dateRef.current.value, await uploadImage(file))
        console.log('URL saved')
        setLoading(false)
        setSuccess(true)
    }
    catch(error){
        console.log(error)
        setError("Upload Failed")
        setLoading(false)
    }
  }


  return (
    <div>

      {loading && <Loader />}
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Add Shows</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {success && <Alert> Show Added Successfully </Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id="name" className='mb-3'>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required ></Form.Control>
            </Form.Group>

            <Form.Group id="description" className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descriptionRef} required ></Form.Control>
            </Form.Group>

            <Form.Group id="author" className='mb-3'>
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" ref={authorRef} required ></Form.Control>
            </Form.Group>

            <Form.Group id="date" className='mb-3'>
              <Form.Label>Air Date</Form.Label>
              <Form.Control type='date' ref={dateRef} required ></Form.Control>
            </Form.Group>

            <Form.Group id="image" className='mb-4'>
              <Form.Label>Image</Form.Label>
              <Form.Control type='file' accept="image/png, image/jpeg" ref={imageRef} required ></Form.Control>
            </Form.Group>

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
