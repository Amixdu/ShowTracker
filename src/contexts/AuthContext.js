import React from 'react'

const AuthContext = React.createContext()

export default function AuthProvider({ children }) {
  return (
    <AuthContext.Provider>
        {children}
    </AuthContext.Provider>
  )
}
