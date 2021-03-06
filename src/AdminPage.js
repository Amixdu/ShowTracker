import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Button, Table } from 'react-bootstrap'
import LoaderMiddle from './LoaderMiddle'
import { Modal, Form, Alert, Container, Card } from 'react-bootstrap'
import Loader from './Loader'


export default function AdminPage() {
  const [fetchedUserData, setFetchedUserData] = useState()
  const [loading, setLoading] = useState()
  const [showRemoveModal, setShowRemoveModal] = useState()
  const [showUpdateModal, setShowUpdateModal] = useState()
  const [clickedShowId, setClickedShowId] = useState()
  const [clickedShowName, setClickedShowName] = useState()
  const [clickedShowAuthor, setClickedShowAuthor] = useState()
  const [clickedShowDate, setClickedShowDate] = useState()
  const [clickedShowUrl, setClickedShowUrl] = useState()
  const [clickedShowDescription, setClickedShowDescription] = useState()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [reload, setReload] = useState(false)

  const nameRef = useRef()
  const authorRef = useRef()
  const descriptionRef = useRef()
  const dateRef = useRef()
  const imageRef = useRef()

  const { pull, pushShow, uploadImage, deleteData, pushShowToList } = useAuth()

  const handleRemoveModalClose = () => setShowRemoveModal(false);
    const handleRemoveModalShow = (id) => {
        setClickedShowId(id)
        setShowRemoveModal(true)
    }

  const handleUpdateModalClose = () => setShowUpdateModal(false);
  const handleUpdateModalShow = (id, name, author, date, description, url) => {
    setClickedShowId(id)
    setClickedShowName(name)
    setClickedShowAuthor(author)
    setClickedShowDate(date)
    setClickedShowDescription(description)
    setClickedShowUrl(url)
    setShowUpdateModal(true)
  }

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setSuccess(false)
    setLoading(true)

    const name = nameRef.current.value
    const author = authorRef.current.value
    const description = descriptionRef.current.value
    const date = dateRef.current.value
    
    try{
        const file = imageRef.current.files[0]
        const path = 'shows/' + clickedShowId
        const users = await pull('users/')
        if (file) {
          const url = await uploadImage(file)
          await pushShow(false, path, name, author, description, date, url)

          // Updating all the shows in the lists as well
          if (users) {
            Object.entries(users).map(async (entry) =>{
              const [key, value] = entry
              const showPath = 'users/' + key + '/list/' + clickedShowId
              const showData = await pull(showPath)
              if (showData){
                await pushShowToList(showPath, name, author, description, date, url, showData.status, showData.rating)
              }
            })
          }
          
        }
        else{
          await pushShow(false, path, name, author, description, date, clickedShowUrl)

          // Updating all the shows in the lists as well
          if (users){
            Object.entries(users).map(async (entry) =>{
              const [key, value] = entry
              const showPath = 'users/' + key + '/list/' + clickedShowId
              const showData = await pull(showPath)
              if (showData) {
                await pushShowToList(showPath, name, author, description, date, clickedShowUrl, showData.status, showData.rating)
              }
            })
          }
        }
        
        setLoading(false)
        setSuccess(true)
        setShowUpdateModal(false)
        setReload(!reload)
    }
    catch(error){
        console.log(error)
        setError("Upload Failed")
        setLoading(false)
    }
  }

  async function handleDelete(e){
    e.preventDefault()
    setError('')
    setLoading(true)
    try{
        const path = 'shows/' + clickedShowId
        await deleteData(path)

        // Deleting the show from all lists
        const res = await pull('users/')
        Object.entries(res).map(async (entry) =>{
          const [key, value] = entry
          await deleteData('users/' + key + '/list/' + clickedShowId)
        })

        setLoading(false)
        setShowRemoveModal(false)
        setReload(!reload)
    }
    catch(error){
        console.log(error)
        setError("Delete Failed")
        setLoading(false)
    }
}

  useEffect(() => {
    setFetchedUserData('')
    const fetch = async () => {
      const res = await pull('shows/')
      setFetchedUserData(res ? res : 'Empty')
    }

    fetch()
  }, [reload])
  
  return (
    <>
      {/* {success && <Alert style={{ textAlign:"center" }}> Update successful. Please reload to see the changes</Alert>} */}

      {fetchedUserData ? 
      (fetchedUserData !== 'Empty' ? (
        <>
          <div className='box'>
              <h2 style={{ fontSize:'40px', fontWeight:"bold", fontFamily:"Georgia, serif" }}>All Shows (Admin Access)</h2>
              {/* <div className='buttonRight'> */}
                  <Link to="/home" className='btn btn-primary'>Go Back</Link>
                  {'  '}
                  <Link to="/admin-add" className='btn btn-primary'>Add Shows</Link>
              {/* </div> */}
          </div>  

          <div className='mt-4'>
            {Object.entries(fetchedUserData).map((entry) => {
              const [key, value] = entry
              return (
                  <Card>
                      <Card.Img variant="top" src={value.url} />
                      <Card.Body>
                          <p style={{ fontSize:'35px', display:'inline-block' }}>{value.name}</p>
                          <Card.Text>
                          <strong style={{ fontSize:'25px' }}>Creator: </strong>
                          <p style={{ fontSize:'25px', display:'inline-block' }}>{value.author}</p>
                          <br />

                          <strong style={{ fontSize:'25px' }}>Description: </strong>
                          <p style={{ fontSize:'25px', display:'inline-block' }}>{value.description}</p>
                          <br />

                          <strong style={{ fontSize:'25px' }}>Air Date: </strong>
                          <p style={{ fontSize:'25px', display:'inline-block' }}>{value.date}</p>
                          <br />

                      
                          </Card.Text>
                          <Button onClick={() => handleUpdateModalShow(key, value.name, value.author, value.date, value.description, value.url)} style={{ width:"200px", fontSize:'20px', margin:'auto', display:'block' }} className='mb-2'>Update</Button>
                          {/* <br /> */}
                          <Button onClick={() => handleRemoveModalShow(key)} variant='danger' style={{ width:"200px", fontSize:'20px', margin:'auto', display:'block' }} className='mb-2'>Remove</Button>
                      </Card.Body>

                  </Card>
              )
            })}
            {/* <Table striped bordered hover>
              <thead>
                <tr>
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
                    console.log(value)
                    return (
                      <tr key={key}>
                        <td width="300">
                          <img width="250" height="150" src={value.url} />
                          <br />
                          {value.name}
                        </td>
                        <td width="240">{value.author}</td>
                        <td width="350">{value.description}</td>
                        <td width="165">{value.date}</td>
                        <td width="150">
                          <Button onClick={() => handleUpdateModalShow(key, value.name, value.author, value.date, value.description, value.url)} style={{ width:"75%" }} className='mb-2'>Update</Button>
                          <Button onClick={() => handleRemoveModalShow(key)} variant='danger' style={{ width:"75%" }} className='mb-2'>Remove</Button>
                        </td>
                      </tr>
                    )
                })}
              </tbody>
            </Table> */}
          </div> 
        </>
      ) : 
      (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
            <div>
                <p style={{ fontSize:'35px' }}> Database is empty </p>
                <Link to="/home" className='btn btn-primary'>Go Back</Link>
                {'  '}
                <Link to="/admin-add" className='btn btn-primary'>Add Shows</Link>
            </div>
          </Container>
      )
      )
      
      : <LoaderMiddle col='primary'/>}

      <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
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

              <Button disabled={loading} className='w-100' type="submit">
                Save Changes
              </Button>

            </Form>
          </Modal.Body>

        </Modal>

      <Modal show={showRemoveModal} onHide={handleRemoveModalClose}>
          {loading && <Loader backgCol={'light'}/>}
          <Modal.Header closeButton>
              <Modal.Title style={{ textAlign:"center" }}> This action will remove this show from the database. Are you sure you want to continue?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Button disabled={loading} className='w-100' onClick={handleDelete}>
                  Confirm
              </Button>
          </Modal.Body>
      </Modal>
    </>
  )
}
