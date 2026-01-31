"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
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
      {singleUser ?
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
      )}
    </div>
  );
};

export default Page;