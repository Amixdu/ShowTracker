import React, { useContext, useEffect, useState } from 'react'

import { auth, storage } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import { getDatabase, ref, set, get, child, push, remove } from "firebase/database";
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
  
  async function signup(email, password){
    await createUserWithEmailAndPassword(auth, email, password)
      // .then((userCredential) => {
      //   const user = userCredential.user;
      //   push_user(user.uid, email, false)
      // })
      // .catch((error) => {
      //   console.log(error.message)
      // });
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

  async function pushShow(newShow, path, showName, showAuthor, showDesc, showDate, showImageUrl){
    const db = getDatabase()
    if (!newShow){
      await set(ref(db, path), {
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
      push(ref(db, path), testP)
    }
  }

  async function pushShowToList(path, showName, showAuthor, showDesc, showDate, showImageUrl, status, rating){
    const db = getDatabase()
    await set(ref(db, path), {
      name: showName,
      description: showDesc,
      author: showAuthor,
      date: showDate,
      url: showImageUrl,
      status: status,
      rating: rating
    })
  }

  async function pull(path){
    const dbRef = ref(getDatabase())
    const res = await get(child(dbRef, path)).then((snapshot) => {
      if (snapshot.exists()){
        return (snapshot.val())
      }
      else{
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

  async function deleteData(path){
    const db = getDatabase()
    await remove(ref(db, path))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user)
      
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
    uploadImage,
    pushShow,
    pushShowToList,
    deleteData
  }

  // The !loading waits until currentUser is set (loading is set to false once everything is saved)
  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
