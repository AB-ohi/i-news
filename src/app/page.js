"use client"
import './home.css'
import usePostNews from "@/middleware/postNews";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("bn-BD", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const NewsCard = ({ post }) => {
  const router = useRouter();
  return (
    <div className="news-card" onClick={() => router.push(`/details/${post._id}`)}>
      {/* Image */}
      <div className="news-card-img-wrap">
        <img src={post.images?.[0]} alt={post.heading} />
        <span className="news-card-badge">{post.category}</span>
      </div>

      {/* Content */}
      <div className="news-card-content">
        <h3 className="news-card-heading">{post.heading}</h3>
        <div className="news-card-footer">
          <span className="news-card-time">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            {formatDate(post.post_time)}
          </span>
          <Link href={`/details/${post._id}`} className="news-card-read">
            বিস্তারিত
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { allPostNews, loading } = usePostNews() || {};

  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading news...</p>
      </div>
    );
  }

  const postNewsFilter = allPostNews?.filter((post) => post.status === "post") || [];
  const categories = [...new Set(postNewsFilter.map((post) => post.category))];

  const groupedNews = categories.map((category) => {
    const categoryNews = postNewsFilter
      .filter((post) => post.category === category)
      .sort((a, b) => new Date(b.post_time) - new Date(a.post_time))
      .slice(0, 4);
    return { category, news: categoryNews };
  });

  return (
    <div className="mainContent">
      {groupedNews.map((group) => (
        <section key={group.category} className="category-section">

          {/* Category Header */}
          <div className="category-header">
            <h2 className="category-title">{group.category}</h2>
            <Link href={`/post/${group.category}`} className="category-see-all">
              আরও দেখুন →
            </Link>
          </div>

          {/* News Grid */}
          <div className="news-grid">
            {group.news.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>

        </section>
      ))}
    </div>
  );
}