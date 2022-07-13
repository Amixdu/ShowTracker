import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Button, Table } from 'react-bootstrap'
import LoaderMiddle from './LoaderMiddle'
import { Modal, Form, Alert, Container } from 'react-bootstrap'
import Loader from './Loader'


export default function List() {
    const [fetchedUserData, setFetchedUserData] = useState()
    const [loading, setLoading] = useState()
    const [showRemoveModal, setShowRemoveModal] = useState()
    const [showUpdateModal, setShowUpdateModal] = useState()
    const [clickedShowId, setClickedShowId] = useState()
    const [clickedShowName, setClickedShowName] = useState()
    const [clickedShowAuthor, setClickedShowAuthor] = useState()
    const [clickedStatus, setClickedStatus] = useState()
    const [clickedRating, setClickedRating] = useState()
    const [clickedShowDate, setClickedShowDate] = useState()
    const [clickedShowUrl, setClickedShowUrl] = useState()
    const [clickedShowDescription, setClickedShowDescription] = useState()
    const [error, setError] = useState('')
    const [reload, setReload] = useState(false)

    const nameRef = useRef()

    const { pull, currentUser, deleteData, pushShowToList } = useAuth()

    const history = useHistory()

    const handleRemoveModalClose = () => setShowRemoveModal(false);
    const handleRemoveModalShow = (id) => {
        setClickedShowId(id)
        setShowRemoveModal(true)
    }

    const handleUpdateModalClose = () => setShowUpdateModal(false);
    const handleUpdateModalShow = (id, name, author, date, description, url, status, rating) => {
        setClickedShowId(id)
        setClickedShowName(name)
        setClickedShowAuthor(author)
        setClickedShowDate(date)
        setClickedShowDescription(description)
        setClickedShowUrl(url)
        setClickedStatus(status)
        setClickedRating(rating)
        setShowUpdateModal(true)
    }

    async function handleDelete(e){
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
            const path = 'users/' + currentUser.uid + '/list/' + clickedShowId
            await deleteData(path)
            // console.log('Delete complete')
            setLoading(false)
            setShowRemoveModal(false)
            setReload(!reload)
        }
        catch(error){
            // console.log(error)
            setError("Delete Failed")
            setLoading(false)
        }
    }

    async function handleUpdate(e){
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
            const path = 'users/' + currentUser.uid + '/list/' + clickedShowId
            await pushShowToList(path, clickedShowName, clickedShowAuthor, clickedShowDescription, clickedShowDate, clickedShowUrl, clickedStatus, clickedStatus == "Plan To Watch" ? "N/A" : clickedRating)
            console.log("List Update Success")
            setLoading(false)
            setShowUpdateModal(false)
            setReload(!reload)
        }
        catch(error){
            console.log(error)
            setError("List Update Failed")
            setLoading(false)
        }
      }

    useEffect(() => {
        setFetchedUserData('')
        const fetch = async () => {
            const path = 'users/' + currentUser.uid + '/list/'
            const res = await pull(path)
            setFetchedUserData(res ? res : 'Empty')
            // console.log(fetchedUserData)
        }

        fetch()
    }, [reload])
    
    return (
        <>
            {/* {success && <Alert style={{ textAlign:"center" }}> List updated successfully. Please reload to see the changes</Alert>} */}
            {fetchedUserData ? 
            (fetchedUserData !== 'Empty' ? (
                <>
                    <div className='box'>
                        <div className='buttonRight'>
                            <Button onClick={() => history.goBack()}>Go Back</Button>
                            {'  '}
                            <Link to="/browse-shows" className='btn btn-primary'>Add Shows to List</Link>
                        </div>
                    </div>  

                    <div className='mt-5'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                {/* <th>Img</th> */}
                                <th>Name</th>
                                <th>Creator</th>
                                <th>Description</th>
                                <th>Air Date</th>
                                <th>Status</th>
                                <th>Rating</th>
                                <th></th>
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
                                        <td width="200">{value.author}</td>
                                        <td width="300">{value.description}</td>
                                        <td width="175">{value.date}</td>
                                        <td width="200">{value.status}</td>
                                        <td width="200">{value.rating}</td>
                                        <td width="125">
                                            <Button onClick={() => handleRemoveModalShow(key)} variant='danger' style={{ margin:'auto', display:'block' }} className='mb-2'>Remove</Button>
                                            <Button onClick={() => handleUpdateModalShow(key, value.name, value.author, value.date, value.description, value.url, value.status, value.rating)} style={{ margin:'auto', display:'block' }}>Update</Button>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </div>
                </>
            ) 
            : 
            (<Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
                <div>
                    <p style={{ fontSize:'35px' }}> List is empty </p>
                    <Link to="/home" className='btn btn-primary'>Go Back</Link>
                    {'  '}
                    <Link to="/browse-shows" className='btn btn-primary'>Add Shows</Link>
                </div>
            </Container>)
            ) : <LoaderMiddle />
        }

        <Modal show={showRemoveModal} onHide={handleRemoveModalClose}>
            {loading && <Loader backgCol={'light'}/>}
            <Modal.Header closeButton>
                <Modal.Title style={{ textAlign:"center" }}> Are you sure you want to remove this show from your list?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Button disabled={loading} className='w-100' onClick={handleDelete}>
                    Confirm
                </Button>
            </Modal.Body>
        </Modal>

        <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
            {loading && <Loader backgCol={'light'}/>}

            <Modal.Header closeButton>
                <Modal.Title> Update Show Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleUpdate}>

                    <Form.Group id="name" className='mb-3'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required defaultValue={clickedShowName}></Form.Control>
                    </Form.Group>

                    <Form.Label>How much have you watched?</Form.Label>
                    <Form.Select onChange={(e) => {setClickedStatus(e.target.value)}} aria-label="Default select example" className='mb-3' value={clickedStatus} >
                        {/* <option></option> */}
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Plan To Watch">Plan To Watch</option>
                    </Form.Select>

                    <Form.Label>How much would you rate the show?</Form.Label>
                    <Form.Select onChange={(e) => {setClickedRating(e.target.value)}} aria-label="Default select example" value={clickedRating} className='mb-3' disabled={clickedStatus === "Plan To Watch" ? true : false}>
                        <option value="N/A">N/A</option>
                        <option value="1 (Very Bad)">1 (Very Bad)</option>
                        <option value="2 (Bad)">2 (Bad)</option>
                        <option value="3 (It's Okay)">3 (It's Okay)</option>
                        <option value="4 (Good)">4 (Good)</option>
                        <option value="5 (Excellent)">5 (Excellent)</option>
                    </Form.Select>

                    <Button disabled={loading} className='w-100' type="submit">
                        Save Changes
                    </Button>

                </Form>
            </Modal.Body>
        </Modal>
    
        </>
    )
}
