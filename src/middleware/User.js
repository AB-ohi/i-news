import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext';
import { useContext } from 'react';

const useUserData = () => {
    const {user} = useContext(AuthContext)
    const [singleUser,setSingleUser] = useState([]);
    const [allUser,setAllUser] = useState([])
    useEffect(()=>{
        if(user){
            fetch(`http://localhost:5000/singleUser/${user.displayName}`)
            .then((res =>res.json()))
            .then(data => setSingleUser(data))
        }
    },[user])

    useEffect(()=>{
  fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setAllUser(data));

    },[])
  return {singleUser, allUser}
}

export default useUserData;
