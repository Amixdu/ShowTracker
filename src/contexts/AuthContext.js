import React, { useContext, useEffect, useState } from 'react'

import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

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
        push_user(user.uid, email, false)
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

  function push_user(userId, email, isAdmin){
    const db = getDatabase()
    set(ref(db, 'users/' + userId), {
      email: email,
      isAdmin: isAdmin,
    })
  }

  async function pull(userId, root){
    const dbRef = ref(getDatabase())
    // const root = isUsers ? 'users/' : 'shows/'
    await get(child(dbRef, root + userId)).then((snapshot) => {
      if (snapshot.exists()){
        setPulledData(snapshot.val())
      }
      else{
        setPulledData('')
      }
    }).catch((error) => {
      console.log(error)
    })
    return
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      try{
        await pull(user.uid, 'users/')
      }
      catch(error){
        console.log(error)
      }
      
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
    push_user,
    pull,
    pulledData
  }

  // The !loading waits until currentUser is set (loading is set to false once everything is saved)
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}