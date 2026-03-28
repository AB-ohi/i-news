import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext';
import { useContext } from 'react';

const useUserData = () => {
    const {user} = useContext(AuthContext)
    // console.log(user)
    const [singleUser,setSingleUser] = useState([]);
    // console.log(singleUser)
    const [allUser,setAllUser] = useState([])
    useEffect(()=>{
        if(user){
            fetch(`https://inews24-server.vercel.app/singleUser/${user.displayName}`)
            .then((res =>res.json()))
            .then(data => setSingleUser(data))
        }
    },[user])
    useEffect(()=>{
  fetch('https://inews24-server.vercel.app/users')
    .then(res => res.json())
    .then(data => setAllUser(data));

    },[])
  return {singleUser, allUser}
}

export default useUserData;
