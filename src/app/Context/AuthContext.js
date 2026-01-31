"use client"; 
import React, { createContext, useEffect, useState } from 'react'
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { app } from '../Auth'

export const AuthContext = createContext()
const auth = getAuth(app)
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signIn = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }
    const createUser= (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const logOut =()=>{
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,createUser=>{
            setUser(createUser);
            setLoading(false)
        })
        return unsubscribe;
    },[])
    const authInfo ={
        signIn,
        createUser,
        logOut,
        user,
        loading,
    }
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  )
}

