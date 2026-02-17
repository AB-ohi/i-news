"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const page = () => {
  const {category} = useParams();
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);

    fetch(`http://localhost:5000/post/${category}`)
      .then(res => res.json())
      .then(data => {
        const sortedPosts = data.sort((a, b) => 
          new Date(b.post_time) - new Date(a.post_time)
        );
        setPosts(sortedPosts);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [category]);

  // Latest post (first one)
  const latestPost = posts[0];
  // Next 2 posts for right column
  const topRightPosts = posts.slice(1, 3);
  // Remaining posts for bottom grid (3 columns)
  const remainingPosts = posts.slice(3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg 
            className="mx-auto h-24 w-24 text-gray-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          <p className="mt-4 text-xl text-gray-500">No posts found in {category}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mt-19.25 md:mt-0 mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 capitalize mb-2">
          {category} News
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
      </div>

      {/* Top Section - Latest post (left) + 2 posts (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Latest Post - Large (Left - 2 columns) */}
        {latestPost && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              {/* Image */}
              <div className="relative w-2/3 m-auto overflow-hidden">
                <img 
                  src={latestPost.images[0]} 
                  alt={latestPost.heading}
                  className=" transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-3">
                  {formatDate(latestPost.post_time)}
                  <span className=" ml-1 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg">
                    {latestPost.category}
                  </span>
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  {latestPost.heading}
                </h2>
                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                  {latestPost.post_detail}
                </p>
                <Link href={`/details/${latestPost._id}`} className="mt-4 text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2">
                  বিস্তারিত
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Right Column - 2 Posts */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {topRightPosts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex-1"
            >
              {/* Image */}
              <div className="relative w-2/3 md:w-full m-auto overflow-hidden">
                <img 
                  src={post.images[0]} 
                  alt={post.heading}
                  className="w-full h-full object-cover  transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                 
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(post.post_time)}
                   <span className=" ml-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-semibold shadow-md">
                    {post.category}
                  </span>
                </p>
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                  {post.heading}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.post_detail}
                </p>
                <Link href={`/details/${post._id}`} className="mt-3 text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
                    বিস্তারিত 
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid - 3 Columns */}
      {remainingPosts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">More News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingPosts.map((post) => (
              <div 
                key={post._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative w-2/3 md:w-full m-auto overflow-hidden">
                  <img 
                    src={post.images[0]} 
                    alt={post.heading}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                 
                </div>
                
                {/* Content */}
                <div className="p-5">
                  <p className="text-xs text-gray-500 mb-2">
                    {formatDate(post.post_time)}
                     <span className=" ml-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-semibold shadow-md">
                    {post.category}
                  </span>
                  </p>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer">
                    {post.heading}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                    {post.post_detail}
                  </p>
                  <Link href={`/details/${post._id}`} className="mt-3 text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1">
                    বিস্তারিত 
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
