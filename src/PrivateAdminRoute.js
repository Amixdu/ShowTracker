import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function PrivateAdminRoute( { component: Component, ...rest }) {
    const [fetchedUserData, setFetchedUserData] = useState()
    const { currentUser, pull } = useAuth()

    useEffect(() => {
        const fetch = async () => {
            const path = 'users/' + currentUser.uid
            const res = await pull(path)
            setFetchedUserData(res)
        }
        fetch()
    }, [])


    return (      
        <>
            {
                fetchedUserData ? 
                <Route 
                    {...rest}
                    render={props => {
                        return (currentUser && fetchedUserData.isAdmin) ? <Component {...props} /> : <Redirect to='/' />
                    }}>
                </Route>
                :
                <></>
            }
        </>   
    )
}
