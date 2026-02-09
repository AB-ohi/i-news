"use client";
import NewsPostImageSlider from "@/component/ImageSlider/ImageSlider";
import postNews from "@/middleware/postNews";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";
import PublishedNews from "@/component/publishedNews/publishedNews";

const page = () => {
   const allPostNews = postNews(); 
  const [allPost, setAllPost] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    if (allPostNews && allPostNews.length > 0) {
      setAllPost(allPostNews);
    }
  }, [allPostNews]);

  const holdingPost =
    allPost.filter((post) => post.status === "holding") || [];
  if (!holdingPost || holdingPost.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <svg
            className="w-24 h-24 mx-auto text-gray-300 mb-4"
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
          <p className="text-gray-500 text-xl">No posts available</p>
        </div>
      </div>
    );
  }
  const HandelUpdatePostStatus = (id) => {
    Swal.fire({
      title: `are you sure for post?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, post it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingId(id);
        try {
          const res = await fetch(
            `http://localhost:5000/api/update-post-status/${id}`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({ status: "post" }),
            },
          );

          const data = await res.json();

          if (data.success) {
            Swal.fire({
              icon: "success",
              title: "Your post is published",
              showConfirmButton: false,
              timer: 1500,
            });

            setAllPost((prev) => prev.filter((post) => post._id !== id));
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Failed to publish post",
            showConfirmButton: false,
            timer: 1500,
          });
        } finally {
          setLoadingId(null);
          window.location.reload();
        }
      }
    });
  };

  return (
    <div className="w-[80%] mx-auto space-y-10  mt-2.5 ms-2.5">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Latest News</h1>
        <p className="text-gray-600">
          Stay updated with our most recent articles
        </p>
        <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-3"></div>
      </div>
      <div className="space-y-6">
        {holdingPost.map((post, index) => (
          <div
            key={post._id || index}
            className="
              bg-gradient-to-br from-blue-50 to-indigo-50
              border-2 border-blue-200 
              rounded-2xl 
              p-4 md:p-6 
              shadow-lg 
              hover:shadow-2xl 
              transition-all 
              duration-300
              hover:border-blue-400
              hover:-translate-y-1
            "
          >
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Image Slider Section */}
              <div className="w-full lg:w-2/5 flex-shrink-0">
                <NewsPostImageSlider post={post} />
              </div>

              {/* Content Section */}
              <div className="flex-1 flex flex-col justify-center space-y-4">
                {/* Category & Date Badge */}
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="
                    px-4 py-1.5 
                    bg-gradient-to-r from-blue-600 to-indigo-600 
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

                {/* Heading */}
                <h2
                  className="
                  text-2xl md:text-3xl 
                  font-bold 
                  text-gray-800 
                  leading-tight
                  transition-colors
                "
                >
                  {post.heading}
                </h2>

                {/* Description */}
                <p
                  className="
                  text-gray-700 
                  text-base md:text-lg 
                  leading-relaxed
                  line-clamp-3
                "
                >
                  {post.post_detail}
                </p>
                <div className="flex gap-2.5">
                  <button
                    className={`
    px-6 py-2.5 
    ${
      loadingId === post._id
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105"
    }
    text-white 
    rounded-lg 
    font-medium
    shadow-md
    hover:shadow-lg
    transition-all 
    duration-300
    transform
    flex items-center gap-2
  `}
                    onClick={() => HandelUpdatePostStatus(post._id)}
                    disabled={loadingId === post._id}
                  >
                    {loadingId === post._id ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Posting...
                      </>
                    ) : (
                      "Post"
                    )}
                  </button>

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
            </div>
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          All post have been published
        </h1>
        <PublishedNews/>
      </div>
    </div>
  );
};

export default page;
