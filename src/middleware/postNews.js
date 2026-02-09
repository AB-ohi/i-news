import { useEffect, useState } from "react";

const postNews = () => {
  const [allPostNews, setAllPostNews] = useState([]); 

  useEffect(() => {
    fetch("http://localhost:5000/all-post")
      .then((res) => res.json())
      .then((data) => {
        setAllPostNews(Array.isArray(data) ? data : []);
        // console.log(data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setAllPostNews([]); 
      });
  }, []);

  return allPostNews;
};

export default postNews;
