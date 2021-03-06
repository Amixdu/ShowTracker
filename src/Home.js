import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Card, Alert, Container } from 'react-bootstrap'
import Loader from './Loader'
import LoaderMiddle from './LoaderMiddle'
import { useAuth } from './contexts/AuthContext'

export default function MainPage() {
  const { currentUser, logout, pull } = useAuth()
  const history = useHistory()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState()
  const [fetchLoaded, setFetchLoaded] = useState(false)

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
      const path = 'admins/'
      const res = await pull(path)
      setIsAdmin(res.includes(currentUser.uid))  
      setFetchLoaded(true)    
    }

    fetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div style={{ backgroundColor:'#1569C7' }}>
      <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: "100vh" }}>
        <div className='w-100' style={{ maxWidth: '400px' }}>
          {loading && <Loader backgCol={'light'}/>}
          {fetchLoaded ?
          <>
            <Card>
              <Card.Body>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className="text-center mb-4">Profile</h2>
                <h5 className="text-center mb-4">{currentUser.email + (isAdmin ? " (admin)" : "")}</h5>
                <Link to="/list" className='btn btn-primary w-100 mb-2'>My List</Link>
                <Link to="/browse-shows" className='btn btn-primary w-100 mb-2'>Browse Shows</Link>
                {isAdmin &&
                <Link to="/admin" className='btn btn-primary w-100 mb-2'>Add/Update Shows (Admin Option)</Link>
                }
              </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
              <Button onClick={handleLogout} style={{ backgroundColor:'white', color:'black' }}>Logout</Button>
            </div>
          </> : <LoaderMiddle col='white'/>
          }
        </div>
      </Container>
    </div>
  )
}