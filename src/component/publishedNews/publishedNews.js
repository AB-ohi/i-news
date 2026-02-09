'use client'
import React, { useEffect, useState } from 'react'

const PublishedNews = () => {
  const [postedNews, setPostedNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-post")
      .then((res) => res.json())
      .then((data) => {
        setPostedNews(Array.isArray(data) ? data : []);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setPostedNews([]); 
      });
  }, []);

  const postNewsFilter = postedNews.filter(post => post.status === 'post');


  if (!postedNews || postedNews.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading...
      </div>
    )
  }

  return (
    <div className="p-4">
      {postNewsFilter.length === 0 ? (
        <p className="text-gray-500">No published news available</p>
      ) : (
        postNewsFilter.map(post => (
          <div key={post._id} className="mb-4 p-4 border rounded-lg">
            <h2 className="text-xl font-bold">{post.heading}</h2>
            <p className="text-gray-700">{post.post_detail}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PublishedNews;
