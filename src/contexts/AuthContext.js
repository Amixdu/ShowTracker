import React, { useContext, useEffect, useState } from 'react'

import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [pulledData, setPulledData] = useState()
  
  // Push email and isAdmin when creating a new account
  async function signup(email, password){
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // setCurrentUser(user)
        push(user.uid, email, false)
      })
      .catch((error) => {
        console.log(error.message)
      });
    return 
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout(){
    return signOut(auth)
  }

  function resetPassword(email){
    return sendPasswordResetEmail(auth, email)
  }

  function push(userId, email, isAdmin){
    const db = getDatabase()
    set(ref(db, 'users/' + userId), {
      email: email,
      isAdmin: isAdmin,
    })
  }

  async function pull(userId){
    const dbRef = ref(getDatabase())
    await get(child(dbRef, `users/${userId}`)).then((snapshot) => {
      if (snapshot.exists()){
        setPulledData(snapshot.val())
      }
      else{
        setPulledData('')
      }
    }).catch((error) => {
      console.log(error)
    })
    return pulledData
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      await pull(user.uid)
      
      setLoading(false)
    })
    return unsubscribe
  }, [])
  

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    push,
    pull,
    pulledData
  }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}