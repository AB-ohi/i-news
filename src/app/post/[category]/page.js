"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
  const {category} = useParams();
  const [posts,setPosts] = useState([])

  const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!category) return;

  setLoading(true);

  fetch(`http://localhost:5000/post/${category}`)
    .then(res => res.json())
    .then(data => {
      setPosts(data);
      setLoading(false);
    });
}, [category]);

  return (
    <div>
      <div>
        <h1>
          {category}
        </h1>
      </div>
      <div>
        
      {
        loading ? (
          <div>Loading...</div>
        ):posts.length ===0? (
          <div>
            no post found
          </div>
        ):(
          <div>
            
          </div>
        )
      }
      </div>
    </div>
  )
}

export default page
