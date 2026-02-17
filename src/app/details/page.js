// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const Page = () => {
//   const params = useParams();
//   const [newsDetails, setNewsDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!params?.id) return;

//     fetch(`http://localhost:5000/api/news/details/${params.id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data)
//         setNewsDetails(data);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, [params.id]);

//   console.log(newsDetails);

//   return <div>Details heading: </div>;
// };

// export default Page;