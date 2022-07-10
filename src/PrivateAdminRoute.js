import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

export default function PrivateRoute( { component: Component, ...rest }) {
    const { currentUser, pulledData } = useAuth()

    return (
        <Route 
            {...rest}
            render={props => {
                return (currentUser && pulledData.isAdmin) ? <Component {...props} /> : <Redirect to='/' />
            }}>

        </Route>
    )
}
