import { useEffect, useState } from "react";

const usePostNews = () => {
  const [allPostNews, setAllPostNews] = useState([]); 
 const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/all-post")
      .then((res) => res.json())
      .then((data) => {
        setAllPostNews(Array.isArray(data) ? data : []);
         setLoading(false);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setAllPostNews([]); 
        setLoading(false);
      });
  }, []);

  return {allPostNews,loading};
};

export default usePostNews;
