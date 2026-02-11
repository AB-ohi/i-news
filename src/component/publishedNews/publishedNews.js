"use client";
import React, { useEffect, useState } from "react";
import NewsPostImageSlider from "../ImageSlider/ImageSlider";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const PublishedNews = () => {
  const [postedNews, setPostedNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-post")
      .then((res) => res.json())
      .then((data) => {
        setPostedNews(Array.isArray(data) ? data : []);
     
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setPostedNews([]);
      });
  }, []);

  const postNewsFilter = postedNews.filter((post) => post.status === "post");

  if (!postedNews || postedNews.length === 0) {
    return <div className="p-4 text-center text-gray-500">Loading...</div>;
  }

  const handelDeletePost = (id) => {
    Swal.fire({
      title: `Are you sure for Delete?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/post-delete/${id}`,
            {
              method: "DELETE",
            },
          );
          const data = await response.json();
          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Post deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });
             setPostedNews((prev) => prev.filter((post) => post._id !== id));
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to publish post",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="p-4">
      {postNewsFilter.length === 0 ? (
        <p className="text-gray-500">No published news available</p>
      ) : (
        <div className="">
          {postNewsFilter.map((post, index) => (
            <div
              key={index}
              className="flex flex-col lg:flex-row mt-3 gap-6 items-start    bg-linear-to-br from-blue-50 to-indigo-50   border-2 border-blue-200    rounded-2xl    p-4 md:p-6    shadow-lg    hover:shadow-2xl    transition-all    duration-300   hover:border-blue-400   hover:-translate-y-1   "
            >
              <div className="w-full lg:w-2/5 shrink-0">
                <NewsPostImageSlider post={post} />
              </div>
              <div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="
                    px-4 py-1.5 
                    bg-linear-to-r from-blue-600 to-indigo-600 
                    text-white 
                    rounded-full 
                    text-sm 
                    font-semibold
                    shadow-md
                  "
                    >
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Date:
                      {new Date(post.post_time).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-gray-500 text-sm">
                      Time:
                      {new Date(post.post_time).toLocaleTimeString("en-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-bold">{post.heading}</h2>
                <p
                  className="text-gray-700 
                  text-base md:text-lg 
                  leading-relaxed
                  line-clamp-3"
                >
                  {post.post_detail}
                </p>
                <button
                  className=" px-6 py-2.5 
                    bg-gradient-to-r from-red-600 to-red-600 
                    text-white 
                    rounded-lg 
                    font-medium
                    shadow-md
                    hover:shadow-lg
                    hover:from-blue-700 
                    hover:to-indigo-700
                    transition-all 
                    duration-300
                    transform
                    hover:scale-105"
                  onClick={() => handelDeletePost(post._id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublishedNews;
