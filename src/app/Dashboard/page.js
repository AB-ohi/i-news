"use client";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Link from "next/link";

const Page = () => {
  const {user} = useContext(AuthContext)
  const searchParams = useSearchParams();
  const displayName = searchParams.get("user");
  const [singleUser, setSingleUser] = useState(null);
  console.log(singleUser)

  useEffect(() => {
    if (displayName) {
      fetch(`http://localhost:5000/singleUser/${displayName}`)
        .then((res) => res.json())
        .then((data) => setSingleUser(data));
    }
  }, [displayName]);


  return (
    <div>
      {
        user? (
          singleUser ?
      (
        
        singleUser?.role =='user' ?(
          <div>
            user
          </div>
        ):
        (
          <div>
            admin
          </div>
        )
       
      ):(
        <p>Lading...</p>
      )
        ): (
          <div>
            go back login Page 
            <Link href='/login'>Login</Link>
          </div>
        )
      }
    </div>
  );
};

export default Page;