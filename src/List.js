import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Button, Table } from 'react-bootstrap'
import LoaderMiddle from './LoaderMiddle'
import { Modal, Form, Alert } from 'react-bootstrap'
import Loader from './Loader'


export default function List() {
  const [fetchedUserData, setFetchedUserData] = useState()
  const [loading, setLoading] = useState()
  const [showModal, setShowModal] = useState()
  const [clickedShowId, setClickedShowId] = useState()
  const [clickedShowName, setClickedShowName] = useState()
  const [clickedShowAuthor, setClickedShowAuthor] = useState()
  const [clickedShowDate, setClickedShowDate] = useState()
  const [clickedShowUrl, setClickedShowUrl] = useState()
  const [clickedShowDescription, setClickedShowDescription] = useState()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const nameRef = useRef()
  const authorRef = useRef()
  const descriptionRef = useRef()
  const dateRef = useRef()
  const imageRef = useRef()

  const { pull, pushShow, uploadImage } = useAuth()

  const handleClose = () => setShowModal(false);
  const handleShow = (id, name, author, date, description, url) => {
    setClickedShowId(id)
    setClickedShowName(name)
    setClickedShowAuthor(author)
    setClickedShowDate(date)
    setClickedShowDescription(description)
    setClickedShowUrl(url)
    setShowModal(true)
    // console.log(id)
  }

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)
    
    try{
        const file = imageRef.current.files[0]
        if (file) {
          await pushShow(clickedShowId, nameRef.current.value, authorRef.current.value, descriptionRef.current.value, dateRef.current.value, await uploadImage(file))
        }
        else{
          await pushShow(clickedShowId, nameRef.current.value, authorRef.current.value, descriptionRef.current.value, dateRef.current.value, clickedShowUrl)
        }
        
        console.log('URL saved')
        setLoading(false)
        setSuccess(true)
        setShowModal(false)
    }
    catch(error){
        console.log(error)
        setError("Upload Failed")
        setLoading(false)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await pull('', 'shows/')
      setFetchedUserData(res)
    }

    fetch()
  }, [])
  
  return (
    <>
      {success && <Alert style={{ textAlign:"center" }}> Update successful. Please reload to see the changes</Alert>}
      <div className='box'>
          <div className='buttonRight'>
              <Link to="/home" className='btn btn-primary'>Go Back</Link>
              {'  '}
              <Link to="/admin-add" className='btn btn-primary'>Add Shows</Link>
          </div>
      </div>  

      {fetchedUserData ? 
      <div className='mt-5'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {/* <th>Img</th> */}
              <th>Name</th>
              <th>Creator</th>
              <th>Description</th>
              <th>Air Date</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(fetchedUserData).map((entry) => {
                const [key, value] = entry
                // console.log(value)
                return (
                  <tr key={key}>
                    <td width="300">
                      <img width="250" height="150" src={value.url} />
                      <br />
                      {value.name}
                    </td>
                    {/* <td></td> */}
                    <td width="250">{value.author}</td>
                    <td>{value.description}</td>
                    <td width="250">{value.date}</td>
                    <td width="150">
                      <Button onClick={() => handleShow(key, value.name, value.author, value.date, value.description, value.url)}>Update</Button>
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={handleClose}>
          {loading && <Loader backgCol={'light'}/>}
          <Modal.Header closeButton>
            <Modal.Title> Update Show Details</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group id="name" className='mb-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" ref={nameRef} required defaultValue={clickedShowName}></Form.Control>
              </Form.Group>

              <Form.Group id="description" className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} ref={descriptionRef} required defaultValue={clickedShowDescription}></Form.Control>
              </Form.Group>

              <Form.Group id="author" className='mb-3'>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" ref={authorRef} required defaultValue={clickedShowAuthor}></Form.Control>
              </Form.Group>

              <Form.Group id="date" className='mb-3'>
                <Form.Label>Air Date</Form.Label>
                <Form.Control type='date' ref={dateRef} required defaultValue={clickedShowDate}></Form.Control>
              </Form.Group>

              <Form.Group id="image" className='mb-4'>
                <Form.Label>Image (Image will not be updated if new one isn't chosen)</Form.Label>
                <Form.Control type='file' accept="image/png, image/jpeg" ref={imageRef} ></Form.Control>
              </Form.Group>

              <Button disbaled={`${loading}`} className='w-100' type="submit">
                Save Changes
              </Button>

            </Form>
          </Modal.Body>

        </Modal>

      </div> : <LoaderMiddle />}
    </>
  )
}
