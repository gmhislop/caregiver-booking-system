import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

// THESE KEYS SHOULDN'T BE EXPOSED IN THE CODE PUT THIS IN AN ENV VARIABLE

export const app = initializeApp({
    apiKey: "{process.env.REACT_APP_API_KEY}", 
    authDomain: "caregivers-auth-dev.firebaseapp.com",
    projectId: "caregivers-auth-dev",
    storageBucket: "caregivers-auth-dev.appspot.com",
    messagingSenderId: "931406431770",
    appId: "1:931406431770:web:cb396ce021af223abfb3a3"
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);