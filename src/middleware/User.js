import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/app/Context/AuthContext';
import { useContext } from 'react';

const useUserData = () => {
    const {user} = useContext(AuthContext)
    // console.log(user)
    const [singleUser,setSingleUser] = useState([]);
    const [allUser,setAllUser] = useState([])
    useEffect(()=>{
        if(user){
            fetch(`http://localhost:5000/singleUser/${user.displayName}`)
            .then((res =>res.json()))
            .then(data => setSingleUser(data))
        }
    },[user])
  return {singleUser}
}

export default useUserData;
