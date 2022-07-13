import React, { useContext, useEffect, useState } from 'react'

import { auth, storage } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, get, child, onValue, push } from "firebase/database";
import { ref as sRef, uploadBytes,getDownloadURL } from "firebase/storage";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [pulledData, setPulledData] = useState()
  const [downloadUrl, setDownloadUrl] = useState()
  
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

  async function pushShow(showId, newShow, showName, showAuthor, showDesc, showDate, showImageUrl){
    const db = getDatabase()

    if (!newShow){
      await set(ref(db, 'shows/' + showId), {
        name: showName,
        description: showDesc,
        author: showAuthor,
        date: showDate,
        url: showImageUrl
      })
    }
    else{
      const testP = {
        name: showName,
        description: showDesc,
        author: showAuthor,
        date: showDate,
        url: showImageUrl
      }
      push(ref(db, 'shows/'), testP)
    }
    

    


  }

  async function pull(id, root){
    const dbRef = ref(getDatabase())
    // const root = isUsers ? 'users/' : 'shows/'
    const res = await get(child(dbRef, root + id)).then((snapshot) => {
      if (snapshot.exists()){
        // setPulledData(snapshot.val())
        return (snapshot.val())
      }
      else{
        // setPulledData('')
        return ('')
      }
    }).catch((error) => {
      console.log(error)
    })
    return res
  }

  async function uploadImage(file){
    const fileRef = sRef(storage, file.name)

    await uploadBytes(fileRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    const res = await getDownloadURL(sRef(storage, fileRef)).then((url) => {
      return url
    }).catch((error) => {
      console.log(error)
    })

    return res
  }

  // async function downloadImage(file){
  //   const fileRef = sRef(storage, file.name)
  //   const res = await getDownloadURL(sRef(storage, fileRef)).then((url) => {
  //     return url
  //   }).catch((error) => {
  //     console.log(error)
  //   })
  //   return res
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)

      // Everytime the users authentication state changes, data (from the realtime database) for the corresponding user is pulled and stored
      // in addition to the user itself (from Firebase authentication)
      // try{
      //   await pull(user.uid, 'users/')
      // }
      // catch(error){
      //   setPulledData('')
      //   console.log(error)
      // }
      
      // setLoading to false once required data is saved
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
    pulledData,
    uploadImage,
    pushShow
  }

  // The !loading waits until currentUser is set (loading is set to false once everything is saved)
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}