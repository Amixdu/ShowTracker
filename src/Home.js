import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Alert } from 'react-bootstrap'
import Loader from './Loader'

import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const [error, setError] = useState()
  const { currentUser, logout, pull, pulledData } = useAuth()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  // console.log(currentUser)

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
    // console.log(currentUser.uid)
    pull(currentUser.uid, 'users/')
    console.log(pulledData)
  }, [])
  

  return (
    <>
      {loading && <Loader />}
      <Card>
        <Card.Body>
          {error && <Alert variant='danger'>{error}</Alert>}
          <h2 className="text-center mb-4">Profile</h2>
          <h5 className="text-center mb-4">{currentUser.email + ' ' + (pulledData.isAdmin ? '(admin)' : '')}</h5>
          <Link to="/list" className='btn btn-primary w-100 mb-2'>My List</Link>
          {pulledData.isAdmin && 
          <Link to="/list" className='btn btn-primary w-100'>Add/Update Shows</Link>
          }
        </Card.Body>
        
      </Card>

      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout} style={{ backgroundColor:'white', color:'black' }}>Logout</Button>
      </div>
        
    </>
  )
}
