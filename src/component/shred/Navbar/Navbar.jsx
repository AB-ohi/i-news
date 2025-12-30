"use client";
import React, { useEffect, useState } from "react";
import INewsLogo from "../../../../public/ImgForHome/INewsLogo.png";
import TimeLoader from "../../../../public/ImgForHome/timeLoader.gif";
import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(null);
  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  
  return (
    
    <div className="mt-2.5">
      <div className="flex justify-between items-center  w-[95%] m-auto">
        <Image className="w-24" src={INewsLogo} alt="" />
        <div>
          <h1 style={{fontFamily:"BanglaFont, sans-serif", fontSize:'40px'}}>সত্যের পক্ষে নির্ভীক</h1>
        </div>
        <div>
          {currentDate ? (
            <div>
              <h1>
                {currentDate?.toLocaleDateString("en-BD", {
                  weekday: "long",
                })}
              </h1>
              <h1>
                {currentDate?.toLocaleDateString("en-BD", {
                  month: "long",
                  year: "numeric",
                  day: "numeric",
                })}
              </h1>
            </div>
          ) : (
            <Image className="w-[130px]" src={TimeLoader} alt="" />
          )}
        </div>
      </div>
      <hr
        className="border-0 h-0.5 my-2"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0))",
        }}
      />
      <nav>
        <ul className="flex justify-around w-[70%] m-auto">
          <Link href="#">
            <li>হোম</li>
          </Link>
          <Link href="#">
            <li>সর্বশেষ</li>
          </Link>
          <Link href="#">
            <li>আন্তর্জাতিক</li>
          </Link>
          <Link href="#">
            <li>বাণিজ্য</li>
          </Link>
          <Link href="#">
            <li>সারাদিন</li>
          </Link>
          <Link href="#">
            <li>খেলা</li>
          </Link>
          <Link href="#">
            <li>আইন আদালত</li>
          </Link>
          <Link href="#">
            <li>বিনোদন</li>
          </Link>
          <Link href="#">
            <li>ধর্ম</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
