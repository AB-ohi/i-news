"use client";
import React, { useEffect, useState } from "react";
import INewsLogo from "../../../../public/ImgForHome/INewsLogo.png";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(null);
  useEffect(()=>{
    setCurrentDate(new Date())
  },[])
  return (
    <div>
      <div className="flex justify-between items-center">
        <Image className="w-24" src={INewsLogo} alt="" />

        <div>
            {
                currentDate? (
                    <div>
                        <h1>
            {currentDate?.toLocaleDateString("en-BD", {
              weekday: "long",
            })||"Loading..."}
          </h1>
          <h1>
            {currentDate?.toLocaleDateString("en-BD", {
                month: "long",
                year: "numeric",
                day: "numeric",
            })||"Loading..."}
          </h1>
                    </div>
                ):(
                    <p>Loading...</p>
                )
            }
        </div>
      </div>
      <nav>
        <ul className="flex justify-around w-[70%] m-auto">
          <Link href='#'><li>হোম</li></Link>
          <Link href='#'><li>সর্বশেষ</li></Link>
          <Link href='#'><li>আন্তর্জাতিক</li></Link>
          <Link href='#'><li>বাণিজ্য</li></Link>
          <Link href='#'><li>সারাদিন</li></Link>
          <Link href='#'><li>খেলা</li></Link>
          <Link href='#'><li>আইন আদালত</li></Link>
          <Link href='#'><li>বিনোদন</li></Link>
          <Link href='#'><li>ধর্ম</li></Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
