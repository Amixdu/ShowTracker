import React, {useEffect, useState} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function PrivateAdminRoute( { component: Component, ...rest }) {
    const [isAdmin, setIsAdmin] = useState()
    const { currentUser, pull } = useAuth()
    const [dataFetched, setDataFetched] = useState()

    useEffect(() => {
        const fetch = async () => {
            const path = 'admins/'
            const res = await pull(path)
            setDataFetched(true)
            setIsAdmin(res?.includes(currentUser.uid))      
        }
        fetch()
    }, [])


    return (      
        <>
            {
                dataFetched ?
                <Route 
                    {...rest}
                    render={props => {
                        return (currentUser && isAdmin) ? <Component {...props} /> : <Redirect to='/' />
                    }}>
                </Route>
                :
                <></>
            }
        </>   
    )
}
