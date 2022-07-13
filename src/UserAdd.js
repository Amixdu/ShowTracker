import React, { useEffect, useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Button, Table } from 'react-bootstrap'
import LoaderMiddle from './LoaderMiddle'
import { Modal, Form, Alert } from 'react-bootstrap'
import Loader from './Loader'


export default function UserAdd() {
    const [fetchedShowData, setFetchedShowData] = useState()
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
    const [alreadyInList, setAlreadyInList] = useState([])
    const [reload, setReload] = useState()

    const [statusSelect, setStatusSelect] = useState("Watching")
    const [rateSelect, setRateSelect] = useState("N/A")
    

    const history = useHistory()

    const { pull, currentUser, pushShowToList } = useAuth()

    const handleClose = () => setShowModal(false);
    const handleShow = (id, name, author, date, description, url) => {
        setClickedShowId(id)
        setClickedShowName(name)
        setClickedShowAuthor(author)
        setClickedShowDate(date)
        setClickedShowDescription(description)
        setClickedShowUrl(url)
        setShowModal(true)
        // console.log(alreadyInList)

        // console.log(id)
    }

    // The handle change function for the status select is done on the component itself (another way to do it)
    const handleRatingOnChange = (e) => {
        setRateSelect(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setError('')
        setSuccess(false)
        setLoading(true)

        try{
            const path = 'users/' + currentUser.uid + '/list/' + clickedShowId
            await pushShowToList(path, clickedShowName, clickedShowAuthor, clickedShowDescription, clickedShowDate, clickedShowUrl, statusSelect, statusSelect == "Plan To Watch" ? "N/A" : rateSelect)
            
            console.log('Added to list')
            setLoading(false)
            setSuccess(true)
            setShowModal(false)
            setReload(!reload)
        }
        catch(error){
            console.log(error)
            setError("Upload Failed")
            setLoading(false)
        }
    }


    useEffect(() => {

        setFetchedShowData('')

        const fetchShowData = async () => {
            const res = await pull('shows/')
            setFetchedShowData(res)
        }

        const fetchUserListData = async () => {
            const path = 'users/' + currentUser.uid + '/list/'
            const res = await pull(path)

            // Saving the ids of already added shows to a list
            Object.entries(res).map((entry) => {
                const [key, value] = entry
                setAlreadyInList(prev => {
                    return [... prev, key]
                })
            })
        }

        fetchUserListData()
        fetchShowData()


    }, [reload])
    
    return (
        <>
        {/* {success && <Alert style={{ textAlign:"center" }}> Your list has been successfully updated!</Alert>} */}
        <div className='box'>
            <div className='buttonRight'>
                <Button onClick={() => history.goBack()}>Go Back</Button>
                {'  '}
                <Link to="/home" className='btn btn-primary'>Home</Link>
                {'  '}
                <Link to="/list" className='btn btn-primary'>My List</Link>
                
            </div>
        </div>  

        {fetchedShowData ? 
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
                    {Object.entries(fetchedShowData).map((entry) => {
                        const [key, value] = entry
                        // console.log(value)
                        const exists = alreadyInList.includes(key)
                        const buttonName = exists ? "Already Added" : "Add to list"
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
                            <Button onClick={() => handleShow(key, value.name, value.author, value.date, value.description, value.url)} disabled={exists}>{buttonName}</Button>
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
                    <Form.Select onChange={(e) => {setStatusSelect(e.target.value)}} aria-label="Default select example" className='mb-3' value={statusSelect}>
                        {/* <option></option> */}
                        <option value="Watching">Watching</option>
                        <option value="Completed">Completed</option>
                        <option value="Plan To Watch">Plan To Watch</option>
                    </Form.Select>

                    <Form.Label>How much would you rate the show?</Form.Label>
                    <Form.Select onChange={handleRatingOnChange} aria-label="Default select example" value={statusSelect !== "Plan To Watch" ? rateSelect : "N/A"} disabled={statusSelect === "Plan To Watch" ? true : false} >
                        {/* <option></option> */}
                        <option value="N/A">N/A</option>
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
