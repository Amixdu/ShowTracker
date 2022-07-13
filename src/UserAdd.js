import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Button, Table } from 'react-bootstrap'
import LoaderMiddle from './LoaderMiddle'
import { Modal, Form, Alert } from 'react-bootstrap'
import Loader from './Loader'


export default function UserAdd() {
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

    const [statusSelect, setStatusSelect] = useState("Watching")
    const [rateSelect, setRateSelect] = useState("1 (Very Bad)")
    

    const nameRef = useRef()
    const authorRef = useRef()
    const descriptionRef = useRef()
    const dateRef = useRef()
    const imageRef = useRef()

    const history = useHistory()

    const { pull, pushShow, uploadImage, currentUser, pushShowToList } = useAuth()

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

    // The handle change function for the rate select is done on the compnonet itself (another way to do it)
    const handleStatusOnChange = (e) => {
        setStatusSelect(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setError('')
        setSuccess(false)
        setLoading(true)

        try{
            const path = 'users/' + currentUser.uid + '/list/' + clickedShowId
            await pushShowToList(path, clickedShowName, clickedShowAuthor, clickedShowDescription, clickedShowDate, clickedShowUrl, statusSelect, rateSelect)
            
            console.log('Added to list')
            setLoading(false)
            setSuccess(true)
            setShowModal(false)
        }
        catch(error){
            console.log(error)
            setError("Upload Failed")
            setLoading(false)
        }

        // console.log(clickedShowName)

        // console.log(statusSelect)
        // console.log(rateSelect)

        // console.log(currentUser.uid)
        // setLoading(false)
    }


    useEffect(() => {
        const fetch = async () => {
        const res = await pull('shows/')
        setFetchedUserData(res)
        }

        fetch()
    }, [])
    
    return (
        <>
        {success && <Alert style={{ textAlign:"center" }}> Your list has been successfully updated!</Alert>}
        <div className='box'>
            <div className='buttonRight'>
                <Button onClick={() => history.goBack()}>Go Back</Button>
                {'  '}
                <Link to="/list" className='btn btn-primary'>My List</Link>
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
                        {/* <td></td> */}
                        <td width="250">{value.author}</td>
                        <td>{value.description}</td>
                        <td width="250">{value.date}</td>
                        <td width="150">
                        <Button onClick={() => handleShow(key, value.name, value.author, value.date, value.description, value.url)} >Add to list</Button>
                        </td>
                    </tr>
                    )
                })}
            </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
            {loading && <Loader backgCol={'light'}/>}
            <Modal.Header closeButton>
                <Modal.Title> Add Show To List</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>

                    <Form.Label>How much have you watched?</Form.Label>
                    <Form.Select onChange={handleStatusOnChange} aria-label="Default select example" className='mb-3' value={statusSelect}>
                        {/* <option></option> */}
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Plan To Watch">Plan To Watch</option>
                    </Form.Select>

                    <Form.Label>How much would you rate the show?</Form.Label>
                    <Form.Select onChange={(e) => {setRateSelect(e.target.value)}} aria-label="Default select example" value={rateSelect} >
                        {/* <option></option> */}
                        <option value="1 (Very Bad)">1 (Very Bad)</option>
                        <option value="2 (Bad)">2 (Bad)</option>
                        <option value="3 (It's Okay)">3 (It's Okay)</option>
                        <option value="4 (Good)">4 (Good)</option>
                        <option value="5 (Excellent)">5 (Excellent)</option>
                    </Form.Select>

                    <br />

                    <Button disabled={loading} className='w-100' type="submit">
                        Add To List
                    </Button>

                </Form>
            </Modal.Body>

            </Modal>

        </div> : <LoaderMiddle />}
        </>
    )
}
