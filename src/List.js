import React from 'react'
import { useAuth } from './contexts/AuthContext'

export default function List() {

    const { push, currentUser } = useAuth()
    const handleClick = () => {
        push(currentUser.uid, currentUser.email, false)
    }

    return (
        <button onClick={handleClick}>
            Test
        </button>
    )
}
