import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Alert } from 'react-bootstrap'

import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const [error, setError] = useState()
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleLogout = async () => {
    setError('')

    try{
      await logout()
      history.push('/')
    }
    catch{
      setError('Logout Failed')
    }

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          <h5 className="text-center mb-4">{currentUser.email}</h5>
          {/* <strong> {currentUser.email} </strong> */}
          <Link to="/list" className='btn btn-primary w-100'>My List</Link>
          {/* <h5 className="text-center mb-4">{currentUser.email}</h5> */}
          {error && <Alert variant='danger'>{error}</Alert>}
        </Card.Body>
        
      </Card>

      <div className="w-100 text-center mt-2">
        <Button onClick={handleLogout} style={{ backgroundColor:'white', color:'black' }}>Logout</Button>
      </div>
        
    </>
  )
}
