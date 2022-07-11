import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Table } from 'react-bootstrap'
import Loader from './Loader'

export default function AdminPage() {
  const { pull } = useAuth()
  const [fetchedUserData, setFetchedUserData] = useState()
  const [loading, setLoading] = useState()

  useEffect(() => {
    const fetch = async () => {
      const res = await pull('', 'shows/')
      setFetchedUserData(res)
    }

    fetch()
  }, [])
  
  return (
    <>
      <div className='box'>
          <div className='buttonRight'>
              <Link to="/admin-add" className='btn btn-primary' style={{ marginLeft: 'auto', marginRight: '0' }}>Add Shows</Link>
              {'   '}
              <Link to="/admin-update" className='btn btn-primary' style={{ marginLeft: 'auto', marginRight: '0' }}>Update Shows</Link>
          </div>
      </div>  

      {fetchedUserData ? 
      <div className='mt-5'>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Creator</th>
              <th>Description</th>
              <th>Air Date</th>
              <th>Air Date</th>
            </tr>
          </thead>

          {Object.entries(fetchedUserData).map((entry) => {
              const [key, value] = entry
              console.log(value)
              return (
                <li key={key}>test</li>
              )
          })}

        </Table>

      </div> : <Loader />}
    </>
  )
}
