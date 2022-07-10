import React from 'react'
import { Link } from 'react-router-dom'
import "./AdminPage.css"

export default function AdminPage() {
  return (
    <div className='box'>
        <div className='buttonRight'>
            <Link to="/admin-add" className='btn btn-primary' style={{ marginLeft: 'auto', marginRight: '0' }}>Add Shows</Link>
            {'   '}
            <Link to="/admin-update" className='btn btn-primary' style={{ marginLeft: 'auto', marginRight: '0' }}>Update Shows</Link>
        </div>
    </div>   
  )
}
