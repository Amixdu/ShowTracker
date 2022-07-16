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
    const [showDetailsModal, setShowDetailsModal] = useState()
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

    const handleDetailsModalClose = () => setShowDetailsModal(false);
    const handleDetailsModalShow = (name, author, date, description, url) => {
        setClickedShowName(name)
        setClickedShowAuthor(author)
        setClickedShowDate(date)
        setClickedShowDescription(description)
        setClickedShowUrl(url)
        setShowDetailsModal(true)
    }

    const onMouseEnter = event => {
        const el = event.target;
        el.style.color = "	#1E90FF"
        el.style.cursor = "pointer"
    };
      
    const onMouseLeave = event => {
        const el = event.target;
        el.style.color = "white";
    };

    async function handleDelete(e){
        e.preventDefault()
        setError('')
        setLoading(true)
        try{
            const path = 'users/' + currentUser.uid + '/list/' + clickedShowId
            await deleteData(path)
            setLoading(false)
            setShowRemoveModal(false)
            setReload(!reload)
        }
        catch(error){
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
        }

        fetch()
    }, [reload])
    
    return (
        <div style={{ backgroundColor:'#121212', minHeight: "100vh" }}>
            {/* {success && <Alert style={{ textAlign:"center" }}> List updated successfully. Please reload to see the changes</Alert>} */}
            {fetchedUserData ? 
                (fetchedUserData !== 'Empty' ? (
                    <div style={{ backgroundColor:'#121212', overflow:'auto' }}>
                        <div className='box'>
                            <h2 style={{ fontSize:'40px', fontWeight:"bold", fontFamily:"Georgia, serif", color:"white" }}>My List</h2>
                            {/* <div className='buttonRight'> */}
                                <Button onClick={() => history.goBack()}>Go Back</Button>
                                {'  '}
                                <Link to="/home" className='btn btn-primary'>Home</Link>
                                {'  '}
                                <Link to="/browse-shows" className='btn btn-primary'>Add Shows to List</Link>
                                
                            {/* </div> */}
                        </div>  

                        <div className='mt-4'>
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Rating</th>
                                    <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Object.entries(fetchedUserData).map((entry) => {
                                        const [key, value] = entry
                                        return (
                                        <tr key={key}>
                                            <td width="325">
                                                <a onMouseEnter={event => onMouseEnter(event)} onMouseLeave={event => onMouseLeave(event)} onClick={() => handleDetailsModalShow(value.name, value.author, value.date, value.description, value.url)} style={{ fontSize:'25px'}}>{value.name}</a>
                                                <br />
                                                <img width="300" height="175" src={value.url} />
                                                <br />
                                            </td>
                                           
                                            <td width="200">{value.status}</td>
                                            <td width="200">{value.rating}</td>
                                            <td width="125">
                                                <Button onClick={() => handleUpdateModalShow(key, value.name, value.author, value.date, value.description, value.url, value.status, value.rating)} style={{ width:"75%", margin:'auto', display:'block' }} className='mb-2'>Update</Button>
                                                <Button onClick={() => handleRemoveModalShow(key)} variant='danger' style={{ width:"75%", margin:'auto', display:'block' }} className='mb-2'>Remove</Button>
                                            </td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                ) 
                : 
                (<Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "95vh" }}>
                    <div>
                        <p style={{ fontSize:'35px', color:'white' }}> List is empty </p>
                        <Button onClick={() => history.goBack()}>Go Back</Button>
                        {'  '}
                        <Link to="/browse-shows" className='btn btn-primary'>Add Shows</Link>
                    </div>
                </Container>)
                ) : <LoaderMiddle col='primary'/>
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

                        <Form.Label>How much have you watched?</Form.Label>
                        <Form.Select onChange={(e) => {setClickedStatus(e.target.value)}} aria-label="Default select example" className='mb-3' value={clickedStatus} >
                            <option value="Watching">Watching</option>
                            <option value="Completed">Completed</option>
                            <option value="Plan To Watch">Plan To Watch</option>
                        </Form.Select>

                        <Form.Label>How much would you rate the show?</Form.Label>
                        <Form.Select onChange={(e) => {setClickedRating(e.target.value)}} aria-label="Default select example" value={clickedStatus !== "Plan To Watch" ? clickedRating : "N/A"} className='mb-3' disabled={clickedStatus === "Plan To Watch" ? true : false}>
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

            <Modal show={showDetailsModal} onHide={handleDetailsModalClose}>
                {loading && <Loader backgCol={'light'}/>}
                <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign:"center" }}> {clickedShowName} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <strong>Creator</strong>
                    <p>{clickedShowAuthor}</p>

                    <strong>Description</strong>
                    <p>{clickedShowDescription}</p>

                    <strong>Air Date</strong>
                    <p>{clickedShowDate}</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}