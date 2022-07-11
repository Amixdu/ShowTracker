import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./AdminPage.css"
import { useAuth } from './contexts/AuthContext'
import { Table } from 'react-bootstrap'

export default function AdminPage() {
  const { pull } = useAuth()
  const [fetchedUserData, setFetchedUserData] = useState()

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

      {fetchedUserData && 
      <div className='mt-5'>
        <Table>

          {Object.entries(fetchedUserData).map((entry) => {
              const [key, value] = entry
              console.log(value)
              return (
                <li key={key}>test</li>
              )
          })}

        </Table>

      </div>}
    </>
  )
}
