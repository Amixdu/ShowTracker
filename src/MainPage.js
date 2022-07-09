import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Alert, Container } from 'react-bootstrap'
import poster from './main_poster.jpg'


import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const [error, setError] = useState()
  const { currentUser } = useAuth()

  const handleLogout = () => {

  }

  return (
    <>
    <h2 className="text-center mb-4">Show Tracker</h2>

    {error && <Alert variant='danger'>{error}</Alert>}

    <img src={poster} style={{ maxWidth: '100%' }}></img>

      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
        <div className='w-100' style={{ maxWidth: '200px' }}>
          
            
          <Link to="/login"> 
            <Button className='text-center mb-2 w-100'>Login</Button> 
          </Link>
          <br />
          {/* <br /> <br /> */}
          <Link to="/signup"> 
            <Button className='text-center mb-2 w-100'>Signup</Button>  
          </Link>
        </div>
      </div>
    </>
  )
}
