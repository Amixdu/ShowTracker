import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Alert } from 'react-bootstrap'
import Loader from './Loader'
import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const { currentUser, logout, pull } = useAuth()
  const history = useHistory()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [fetchedUserData, setFetchedUserData] = useState()

  const handleLogout = async () => {
    setLoading(true)
    setError('')
    try{
      await logout()
      history.push('/')
    }
    catch{
      setError('Logout Failed')
    }
    setLoading(false)
  }

  useEffect(() => {
    const fetch = async () => {
      const path = 'users/' + currentUser.uid
      const res = await pull(path)
      setFetchedUserData(res)
    }

    fetch()
  }, [])
  
  return (
    <>
      {loading && <Loader backgCol={'light'}/>}
      <Card>
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <h2 className="text-center mb-4">Profile</h2>
          <h5 className="text-center mb-4">{currentUser.email + (fetchedUserData?.isAdmin ? " (admin)" : "")}</h5>
          <Link to="/list" className='btn btn-primary w-100 mb-2'>My List</Link>
          <Link to="/browse-shows" className='btn btn-primary w-100 mb-2'>Browse Shows</Link>
          {fetchedUserData?.isAdmin && 
          <Link to="/admin" className='btn btn-primary w-100 mb-2'>Add/Update Shows (Admin Option)</Link>
          }
        </Card.Body>
      </Card>

      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout} style={{ backgroundColor:'white', color:'black' }}>Logout</Button>
      </div>
    </>
  )
}