"use client";
import "./navbar.css";
import React, { useContext, useEffect, useState } from "react";
import INewsLogo from "../../../../public/ImgForHome/INewsLogo.png";
import TimeLoader from "../../../../public/ImgForHome/timeLoader.gif";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import {  Noto_Serif_Bengali } from 'next/font/google'
import { usePathname } from "next/navigation";
import { AuthContext } from "@/app/Context/AuthContext";
import profileImg from '../../../../public/all_img/profileImg.webp'
import useUserData from "@/middleware/User";
const bengaliFont = Noto_Serif_Bengali({
  weight: ['700'],
  subsets: ['bengali'],
  display: 'swap',
})
const Navbar = () => {
  const {user, logOut} = useContext(AuthContext);
  // console.log(user)
  const [currentDate, setCurrentDate] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const pathName = usePathname()
  const {singleUser} = useUserData([]) 
  console.log(singleUser)
  useEffect(() => {

    setCurrentDate(new Date());
  }, []);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
 if(pathName.startsWith("/login")|| pathName.startsWith("/register") || pathName.startsWith("/Dashboard")){
  return null;
 }
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const formatDate = (date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${month} ${day}, ${year}`;
  };

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap");
      `}</style>
      <div className="">
        <div className="w-full">
          <div className="flex justify-between items-center z-40 fixed w-full top-0 bg-white">
            <Image
              className="w-24 ml-1.5 rounded-[50%] md:block hidden my-1.5"
              src={INewsLogo}
              alt=""
            />
            <div className="text-center font-bold md:ml-35 ml-0">
              <h1 style={{ fontSize: "40px" }}>
                <span className="text-blue-700">I News</span>{" "}
                <span className="text-red-500">24</span>
              </h1>
              <p className={bengaliFont.className}
                style={{
                  fontFamily:  "'Tiro Bangla', 'Noto Serif Bengali', serif",
                  fontWeight: "700",
                }}
              >
                সত্যের পক্ষে নির্ভীক
              </p>
            </div>
            <div className="mr-3">
              {currentDate ? (
                <div
                  style={{
                    fontFamily: "'Gideon Roman', serif",
                    fontWeight: "bold",
                  }}
                  className=" gap-4 "
                >
                  {time ? (
                    <div className="clock-container">
                      <div className="clock-wrapper">
                        <div className="time-display">
                          <div className="time-box-wrapper">
                            <div className="glow-effect glow-purple"></div>
                            <div className="time-box">
                              <span className="time-digit">{hours}</span>
                            </div>
                          </div>

                          <span className="separator">:</span>

                          <div className="time-box-wrapper">
                            <div className="glow-effect glow-blue"></div>
                            <div className="time-box">
                              <span className="time-digit">{minutes}</span>
                            </div>
                          </div>

                          <span className="separator">:</span>

                          <div className="time-box-wrapper">
                            <div className="glow-effect glow-pink"></div>
                            <div className="time-box">
                              <span className="time-digit">{seconds}</span>
                            </div>
                          </div>
                        </div>

                        <div className="date-wrapper">
                          <div className="date-glow"></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Image className="w-[130px]" src={TimeLoader} alt="" />
                  )}
                  <div className="dateAndDay">
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
            className="border-0 h-1 w-full fixed top-[107px] "
            style={{
              background:
                "linear-gradient(85deg,rgba(13, 86, 212, 0.6) 19%, rgba(255, 0, 0, 1) 50%, rgba(13, 86, 212, 0.6) 79%)",
            }}
          />
        </div>

        <nav className="bav navbar mt-[120.6px]">
          <ul className="navBarList">
            <Link href="/">
              <li>হোম</li>
            </Link>
            <Link href="/latest">
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
          <div className="">
            <div
              className={`
            flex items-center gap-3 bg-white/10 backdrop-blur-md 
            rounded-full border border-white/20 px-5 py-1
            transition-all duration-500 ease-out
            ${
              isFocused
                ? "w-80 shadow-2xl shadow-purple-500/50 border-purple-400/50"
                : "w-64 shadow-lg"
            }
            hover:shadow-xl hover:shadow-purple-500/30
          `}
            >
              <CiSearch
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`
              transition-all duration-500
              ${
                isFocused
                  ? "text-purple-400 w-5 h-5 rotate-90"
                  : "text-white/70 w-5 h-5"
              }
            `}
              />
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="
              flex bg-transparent border-none outline-none 
              text-white placeholder-white/50
              text-base
            "
              />
            </div>
            <div
              className={`
              rounded-full bg-gradient-to-r from-purple-500 to-pink-500
            blur-xl opacity-0 transition-opacity duration-500
            ${isFocused ? "opacity-30" : "opacity-0"}
          `}
            />
          </div>
          <Link href={``}>
            {
            user === null? (
              <div>
                <button><Link className="text-[#00007d] bg-amber-50 px-2 border-2 duration-300 ease-in rounded-2xl transition-all  hover:bg-[#00007d] hover:text-amber-50" href='/login'>Login</Link></button>
               
              </div>
            ):(
              <div className="flex items-center">
                <Link href={`/Dashboard?user=${singleUser.displayName}&role=${singleUser.role}`}><Image className="w-7  rounded-full " src={user?.photoURL || profileImg}/></Link>
                
              </div>
            )
          }  
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
