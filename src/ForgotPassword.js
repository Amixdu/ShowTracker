import React, { useRef, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'


export default function ForgotPassword() {
  const emailRef = useRef()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const { resetPassword } = useAuth()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')

    try{
      setLoading(true)
      await resetPassword(emailRef.current.value)
      console.log("Success")
      setSuccess(true)
    }
    catch(error){
      console.log(error)
      setSuccess(false)
      setError("Password Reset Failed")
    }

    setLoading(false)
  }

  return (
    <>
      <div>
        {loading && 'Loading ...'}
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Password Reset</h2>
            
            {success? <Alert>Reset instructions has been sent to your Email</Alert> : error && <Alert variant='danger'>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required></Form.Control>
              </Form.Group>

              <br></br>

              <Button disbaled={loading} className='w-100' type="submit">
                Reset Password
              </Button>
            </Form>

            <div className="w-100 text-center mt-3">
              <Link to="/login"> Login </Link>
            </div>

          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-2" style={{ color:'white' }}>
          Don't have an account? <Link to="/signup" style={{ color:'white' }}> Signup </Link>
        </div>

      </div>
    </>
  )
}
