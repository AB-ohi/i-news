"use client";
import "./navbar.css";
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
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-2.5">
      <div className="flex justify-between items-center  w-[95%] m-auto">
        <Image className="w-24 md:block hidden" src={INewsLogo} alt="" />
        <div className="text-center font-bold md:ml-35 ml-0">
          <h1 style={{ fontSize: "40px" }}>
            <span className="text-blue-700">I News</span>{" "}
            <span className="text-red-500">24</span>
          </h1>
          <p
            style={{
              fontFamily: "'Noto Serif Bengali', serif",
              fontWeight: "700",
            }}
          >
            সত্যের পক্ষে নির্ভীক
          </p>
        </div>
        <div>
          {currentDate ? (
            <div className="flex items-center gap-4">
              {time ? (
                <div className="relative w-20 h-20">
                  {/* Clock border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl"></div>

                  {/* Clock face */}
                  <div className="absolute inset-1 rounded-full bg-white shadow-inner">
                    {/* Numbers 1-12 */}
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
                      const angle = (num * 30 - 90) * (Math.PI / 180);
                      const radius = 30;
                      const x = radius * Math.cos(angle);
                      const y = radius * Math.sin(angle);

                      return (
                        <div
                          key={num}
                          className="absolute font-semibold text-black text-[10px]"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                          }}
                        >
                          {num}
                        </div>
                      );
                    })}

                    {/* Hour hand */}
                    <div
                      className="absolute w-1 h-5 bg-black rounded-full origin-bottom left-1/2 -translate-x-1/2"
                      style={{
                        bottom: "50%",
                        transform: `translateX(-50%) rotate(${
                          (time.getHours() % 12) * 30 + time.getMinutes() * 0.5
                        }deg)`,
                        transformOrigin: "bottom center",
                      }}
                    />

                    {/* Minute hand */}
                    <div
                      className="absolute w-0.5 h-7 bg-gray-700 rounded-full origin-bottom left-1/2 -translate-x-1/2"
                      style={{
                        bottom: "50%",
                        transform: `translateX(-50%) rotate(${
                          time.getMinutes() * 6
                        }deg)`,
                        transformOrigin: "bottom center",
                      }}
                    />

                    {/* Second hand */}
                    <div
                      className="absolute w-[1px] h-8 bg-red-600 rounded-full origin-bottom left-1/2 -translate-x-1/2"
                      style={{
                        bottom: "50%",
                        transform: `translateX(-50%) rotate(${
                          time.getSeconds() * 6
                        }deg)`,
                        transformOrigin: "bottom center",
                      }}
                    />

                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-600 rounded-full z-10"></div>
                  </div>
                </div>
              ) : (
                <Image className="w-[130px]" src={TimeLoader} alt="" />
              )}
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
            </div>
          ) : (
            <Image className="w-[130px]" src={TimeLoader} alt="" />
          )}
        </div>
      </div>
      <hr
        className="border-0 h-[4px] my-2"
        style={{
          background:
            "linear-gradient(85deg,rgba(13, 86, 212, 0.6) 19%, rgba(255, 0, 0, 1) 50%, rgba(13, 86, 212, 0.6) 79%)",
        }}
      />
      <nav>
        <ul className="flex justify-around w-[70%] m-auto navList">
          <Link href="#">
            <li>হোম</li>
          </Link>
          <Link href="#">
            <li>সর্বশেষ</li>
          </Link>
          <Link href="#">
            <li>সারাদেশ</li>
          </Link>
          <Link href="#">
            <li>আন্তর্জাতিক</li>
          </Link>
          <Link href="#">
            <li>বাণিজ্য</li>
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
