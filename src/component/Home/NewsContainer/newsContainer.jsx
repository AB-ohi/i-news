"use client";
import { useRouter } from "next/navigation";

const NewsCard = ({ news }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/news/${news._id}`);
  };

  // Format date to Bangla
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Truncate text
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-200">
        <img
          src={news.images}
          alt={news.heading}
          className="w-full h-full object-cover"
        />
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
          {news.category}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Heading */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {news.heading}
        </h3>

        {/* Post Detail Preview */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {truncateText(news.post_detail.replace(/\\n/g, " "), 150)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
          <span>{formatDate(news.post_time)}</span>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
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
            {news.imageCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;