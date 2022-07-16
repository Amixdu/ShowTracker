// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth }  from 'firebase/auth'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqKg8tQrdttBf1PIagX6gKoWVFYJLRmVs",
  authDomain: "auth-showtracker.firebaseapp.com",
  databaseURL: "https://auth-showtracker-default-rtdb.firebaseio.com",
  projectId: "auth-showtracker",
  storageBucket: "auth-showtracker.appspot.com",
  messagingSenderId: "1087708722286",
  appId: "1:1087708722286:web:675e143112fbce48e7e27f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)

// export default app