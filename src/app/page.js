// import Image from "next/image";
import NewsContainer from "@/component/Home/NewsContainer/newsContainer";
import './home.css'
import SideContent from "@/component/Home/SideContent/SideContent";
export default function Home() {
  return (
   <div className="mainContent">
    <NewsContainer/>
    <SideContent/>
   </div>
  );
}
