import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Alert, Container } from 'react-bootstrap'
import poster from './main_poster.jpg'


import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const [error, setError] = useState()
  const { currentUser } = useAuth()

  return (
    <div style={{backgroundImage:`url(${poster})`, height:'100vh', width: '100vw', backgroundPosition: 'center', backgroundSize: 'cover' }}>

      {error && <Alert variant='danger'>{error}</Alert>}

      {/* <img src={poster} style={{ maxWidth: '100%' }}></img> */}

      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height:'100vh'}}>
        
        <div className='w-100' style={{ maxWidth: '600px' }}>
          
          <h1 className="text-center mb-4" style={{ color:'white', fontSize:'100px'}}>Show Tracker</h1>
          
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
    </div>
  )
}
