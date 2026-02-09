import React, { useState, useEffect } from "react";

const NewsPostImageSlider = ({ post }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const totalImages = post?.images?.length || 0;

  useEffect(() => {
    if (totalImages === 0) return;

    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % totalImages);
    }, 2000);

    return () => clearInterval(interval);
  }, [totalImages]);

  if (!post || totalImages === 0) {
    return <p>No images available</p>;
  }

  return (
    <div style={{ flex: 1, position: "relative",  }}>
      {totalImages > 0 && (
        <img
          src={post.images[currentImg]}
          alt={post.heading}
          style={{
            borderRadius: "8px",
            transition: "all 0.5s ease",
          }}
        />
      )}
    </div>
  );
};

export default NewsPostImageSlider;
