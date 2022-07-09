import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Alert } from 'react-bootstrap'

import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const [error, setError] = useState()
  const { currentUser } = useAuth()

  const handleLogout = () => {

  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Show Tracker</h2>
          <strong> {currentUser.email} </strong>
          {error && <Alert variant='danger'>{error}</Alert>}

          
        </Card.Body>
        
      </Card>

      <Link to="/login"> Login </Link>
        <br></br>
      <Link to="/signup"> Signup </Link>

      <div className="w-100 text-center mt-2">
        <Button variant='link'>Logout</Button>
      </div>
        
    </>
  )
}
