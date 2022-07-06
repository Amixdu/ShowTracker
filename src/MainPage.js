import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function MainPage() {
  return (
    <div>
        <Link to="/login"> Login </Link>
        <br></br>
        <Link to="/signup"> Signup </Link>
    </div>
  )
}
