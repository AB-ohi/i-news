"use client";

import { useState } from "react";
import ReactImageUploading from "react-images-uploading";
import uploadImage from "../../../../public/all_img/uploadImage.gif";
import Image from "next/image";
import { GrUpdate } from "react-icons/gr";
import { CiCircleRemove } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const IMAGE_UPLOAD_TOKEN = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_TOKEN;

const Page = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const maxNumber = 10;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const [formData, setFormData] = useState({
    post_detail: "",
    heading: "",
    category: "",
    post_time: "",
  });

  console.log(formData);

  const isFormValid = () => {
    return (
      formData.post_detail.trim() &&
      formData.heading.trim() &&
      formData.category.trim() &&
      formData.post_time.trim() &&
      images.length > 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (!isFormValid()) {
      alert("Please fill all fields and upload at least one image");
      return;
    }
    if (!IMAGE_UPLOAD_TOKEN) {
      Swal.fire({
        icon: "error",
        title: "Missing Image Upload Token",
        text: "Please check your environment variables.",
      });
      return;
    }
    const newsData = {
      ...formData,
      images: images.map((img) => img.data_url),
      imageCount: images.length,
      createdAt: new Date().toISOString(),
    };
    // console.log("Submitting news data:", newsData);
    try {
      const image_token = `https://api.imgbb.com/1/upload?key=${IMAGE_UPLOAD_TOKEN}`;
      const uploadImage = await Promise.all(
        images.map(async (imageObj) => {
          const imageData = new FormData();
          imageData.append("image", imageObj.file);

          const response = await fetch(image_token, {
            method: "POST",
            body: imageData,
          });
          const result = await response.json();
          if (result.success) {
            return result.data.url;
          } else {
            throw new Error("image upload fail");
          }
        }),
      );
      const newsAllData = {
        ...newsData,
        images: uploadImage,
      };
      console.log("Submitting news data:", newsAllData);
      const res = await fetch("http://localhost:5000/api/post-news", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newsAllData),
      });
      const data = await res.json();
      if (data.insertedId) {
        setLoading(false)
        Swal.fire({
          icon: "success",
          title: "news post success",
          showConfirmButton: false,
          timer: 1500,
        });
        setImages([]);
        setFormData({
          post_detail: "",
          heading: "",
          category: "",
          post_time: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message || "Something went wrong!",
      });
      console.error("Error while uploading product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-6 w-full md:w-[80%]">
      <div
        className={`${loading ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm" : ""}`}
      >
        {loading && (
          <>
            <div className=" relative flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-red-600 animate-spin"></div>
              <div
                className="absolute w-10 h-10 rounded-full border-4 border-transparent border-b-red-400 animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "0.6s",
                }}
              ></div>
            </div>

            <p className="text-xl font-semibold text-gray-800 font-serif">
              পোস্ট আপলোড হচ্ছে...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              অনুগ্রহ করে অপেক্ষা করুন
            </p>
          </>
        )}
      </div>
      <div className="max-w-7xl mx-auto md:mt-0 mt-9 ">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Post New News</h1>
          <p className="text-gray-600 mt-2">
            Upload images for your news article
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Image Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <ReactImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                <div>
                  {imageList?.length > 0 ? (
                    <div className="upload__image-wrapper">
                      {/* Upload More Button */}
                      <div className="mb-6 flex justify-between items-center">
                        <button
                          type="button"
                          onClick={onImageUpload}
                          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center gap-2"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add More Images
                        </button>

                        <div className="text-sm text-gray-600">
                          {imageList.length} / {maxNumber} images uploaded
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                        {imageList.map((image, index) => (
                          <div
                            key={index}
                            className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                          >
                            <img
                              className="w-full h-48 object-cover"
                              src={image["data_url"]}
                              alt={`Upload ${index + 1}`}
                            />

                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => onImageUpdate(index)}
                                className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-3 transition-all transform hover:scale-110 shadow-lg"
                                title="Update Image"
                              >
                                <GrUpdate className="text-xl" />
                              </button>
                              <button
                                type="button"
                                onClick={() => onImageRemove(index)}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-3 transition-all transform hover:scale-110 shadow-lg"
                                title="Remove Image"
                              >
                                <CiCircleRemove className="text-xl" />
                              </button>
                            </div>

                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                              {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Remove All Button */}
                      <button
                        type="button"
                        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        onClick={() => {
                          onImageRemoveAll();
                          setFormData({
                            post_detail: "",
                            heading: "",
                            category: "",
                            post_time: "",
                          });
                        }}
                      >
                        <MdDeleteForever className="text-xl" />
                        Remove All Images
                      </button>
                    </div>
                  ) : (
                    /* Upload Zone */
                    <div
                      onClick={onImageUpload}
                      {...dragProps}
                      className={`
                        cursor-pointer 
                        border-3 border-dashed rounded-2xl 
                        p-12 
                        flex flex-col items-center justify-center 
                        transition-all duration-300
                        ${
                          isDragging
                            ? "border-blue-600 bg-blue-50 scale-105"
                            : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                        }
                      `}
                    >
                      <Image
                        className="w-48 mb-4"
                        src={uploadImage}
                        alt="Upload"
                      />
                      <p className="text-xl font-semibold text-blue-600 mb-2">
                        Click or Drag to Upload Images
                      </p>
                      <p className="text-sm text-gray-500">
                        Maximum {maxNumber} images allowed
                      </p>
                    </div>
                  )}
                </div>
              )}
            </ReactImageUploading>
          </div>

          {/* News Details Section */}
          {images?.length > 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               
                <div className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-lg">
                      News Details
                    </label>
                    <textarea
                      value={formData.post_detail}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          post_detail: e.target.value,
                        })
                      }
                      className="
                        w-full
                        min-h-[200px]
                        max-h-[500px]
                        p-4
                        border-2
                        border-gray-300
                        rounded-xl
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        focus:outline-none
                        resize-none
                        overflow-y-auto
                        transition-all
                        duration-200
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        hover:border-gray-400
                      "
                      name="post_detail"
                      placeholder="Write your news details here..."
                      required
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-2">
                      Write detailed information about your news article
                    </p>
                  </div>
                </div>

              
                <div className="space-y-6">
                  {/* News Heading */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-lg">
                      Heading for this News
                    </label>
                    <input
                      value={formData.heading}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          heading: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter news headline..."
                      name="heading"
                      className="
                        w-full
                        p-4
                        border-2
                        border-gray-300
                        rounded-xl
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        focus:outline-none
                        transition-all
                        duration-200
                        text-gray-700
                        placeholder-gray-400
                        shadow-sm
                        hover:border-gray-400
                      "
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Create an engaging headline
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-lg">
                      News Category
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="
                        w-full
                        p-4
                        border-2
                        border-gray-300
                        rounded-xl
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        focus:outline-none
                        transition-all
                        duration-200
                        text-gray-700
                        bg-white
                        shadow-sm
                        hover:border-gray-400
                        cursor-pointer
                      "
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="national">National</option>
                      <option value="international">International</option>
                      <option value="politics">politics</option>
                      <option value="business">Business</option>
                      <option value="sports">Sports</option>
                      <option value="law">Law & Court</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="religion">Religion</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-2">
                      Choose the most relevant category
                    </p>
                  </div>

                  {/* Post Time */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-lg">
                      Post Time
                    </label>
                    <input
                      value={formData.post_time}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          post_time: e.target.value,
                        })
                      }
                      type="datetime-local"
                      name="post_time"
                      className="
                        w-full
                        p-4
                        border-2
                        border-gray-300
                        rounded-xl
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        focus:outline-none
                        transition-all
                        duration-200
                        text-gray-700
                        bg-white
                        shadow-sm
                        hover:border-gray-400
                        cursor-pointer
                      "
                      required
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Schedule when this news will be published
                    </p>
                  </div>

                  {/* Submit Button */}
                  {isFormValid() ? (
                    <button
                      type="submit"
                      className="
                        w-full
                        px-6
                        py-4
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                        rounded-xl
                        hover:from-blue-700
                        hover:to-indigo-700
                        transition-all
                        duration-300
                        font-semibold
                        text-lg
                        shadow-lg
                        hover:shadow-xl
                        transform
                        hover:scale-105
                      "
                    >
                      Publish News
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="
                        w-full
                        px-6
                        py-4
                        bg-gray-300
                        text-gray-500
                        rounded-xl
                        font-semibold
                        text-lg
                        cursor-not-allowed
                      "
                    >
                      Fill all fields to publish
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-6 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-gray-600 text-lg">
                First add images to continue with news details
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Page;
