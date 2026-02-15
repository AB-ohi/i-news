"use client";
import "./navbar.css";
import React, { useContext, useEffect, useState } from "react";
import INewsLogo from "../../../../public/ImgForHome/INewsLogo.png";
import TimeLoader from "../../../../public/ImgForHome/timeLoader.gif";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { Noto_Serif_Bengali } from "next/font/google";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/app/Context/AuthContext";
import profileImg from "../../../../public/all_img/profileImg.webp";
import useUserData from "@/middleware/User";

const bengaliFont = Noto_Serif_Bengali({
  weight: ["700"],
  subsets: ["bengali"],
  display: "swap",
});

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [currentDate, setCurrentDate] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const { singleUser } = useUserData([]);
  
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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  if (
    pathName.startsWith("/login") ||
    pathName.startsWith("/register") ||
    pathName.startsWith("/Dashboard")
  ) {
    return null;
  }

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return { hours, minutes, seconds };
  };

  const { hours, minutes, seconds } = formatTime(time);
  
  const categories = [
    { label: "সর্বশেষ", value: "/" },
    { label: "রাজনীতি", value: "politics" },
    { label: "সারাদেশ", value: "national" },
    { label: "আন্তর্জাতিক", value: "international" },
    { label: "বাণিজ্য", value: "business" },
    { label: "খেলা", value: "sports" },
    { label: "আইন আদালত", value: "law" },
    { label: "বিনোদন", value: "entertainment" },
    { label: "ধর্ম", value: "religion" },
  ];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Gideon+Roman&display=swap");
      `}</style>
      
      <div>
        <div className="w-full">
          <div className="flex justify-between items-center z-40 fixed w-full top-0 bg-white px-4">
            <Image
              className="w-16 md:w-24 rounded-[50%] my-1.5"
              src={INewsLogo}
              alt="I News Logo"
            />
            
            <div className="text-center font-bold">
              <h1 className="text-2xl md:text-4xl">
                <span className="text-blue-700">I News</span>{" "}
                <span className="text-red-500">24</span>
              </h1>
              <p
                className={`${bengaliFont.className} text-sm md:text-base`}
                style={{
                  fontFamily: "'Tiro Bangla', 'Noto Serif Bengali', serif",
                  fontWeight: "700",
                }}
              >
                সত্যের পক্ষে নির্ভীক
              </p>
            </div>
            
            <div className="hidden md:block">
              {currentDate ? (
                <div
                  style={{
                    fontFamily: "'Gideon Roman', serif",
                    fontWeight: "bold",
                  }}
                  className="gap-4"
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
                      </div>
                    </div>
                  ) : (
                    <Image className="w-[130px]" src={TimeLoader} alt="" />
                  )}
                  <div className="dateAndDay">
                    <h1 className="text-sm">
                      {currentDate?.toLocaleDateString("en-BD", {
                        weekday: "long",
                      })}
                    </h1>
                    <h1 className="text-xs">
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
            className="border-0 h-1 w-full fixed top-[90px] md:top-[107px] z-40"
            style={{
              background:
                "linear-gradient(85deg,rgba(13, 86, 212, 0.6) 19%, rgba(255, 0, 0, 1) 50%, rgba(13, 86, 212, 0.6) 79%)",
            }}
          />
        </div>

        {/* Desktop Navbar */}
        <nav className="navbar mt-[100px] md:mt-[120.6px] hidden md:flex">
          <ul className="navBarList">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value === "/" ? "/" : `/post/${cat.value}`}
              >
                <li
                  className={`cursor-pointer ${
                    pathName === (cat.value === "/" ? "/" : `/post/${cat.value}`)
                      ? "text-[#4facfe] border-blue-300"
                      : ""
                  }`}
                >
                  {cat.label}
                </li>
              </Link>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
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
                  text-base w-full
                "
              />
            </div>

            {user === null ? (
              <Link
                className="text-[#00007d] bg-amber-50 px-4 py-1 border-2 duration-300 ease-in rounded-2xl transition-all hover:bg-[#00007d] hover:text-amber-50"
                href="/login"
              >
                Login
              </Link>
            ) : (
              <Link
                href={`/Dashboard?user=${singleUser?.name}&role=${singleUser?.role}`}
              >
                <Image
                  className="w-8 h-8 rounded-full object-cover"
                  src={user?.photoURL || profileImg}
                  alt="Profile"
                  width={32}
                  height={32}
                />
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden fixed top-24 right-4 z-50 bg-[#00007d] text-white p-2 rounded-lg shadow-lg ${isMenuOpen? ('hidden'):('')}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <HiX className=" hidden" />
          ) : (
            <HiMenuAlt3 className="" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`
            md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40
            transition-opacity duration-300
            ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Sliding Menu */}
        <nav
          className={`
            md:hidden fixed top-0 right-0 h-full w-80 bg-[#00007d] z-40
            transform transition-transform duration-500 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            shadow-2xl
          `}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-white text-xl font-bold">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-red-400 transition-colors"
                >
                  <HiX className="w-6 h-6" />
                </button>
              </div>
              
              {/* Mobile Search */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 px-4 py-2">
                <CiSearch className="text-white/70 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none outline-none text-white placeholder-white/50 text-sm w-full"
                />
              </div>
            </div>

            {/* Mobile Menu Items */}
            <ul className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
              {categories.map((cat, index) => (
                <Link
                  key={cat.value}
                  href={cat.value === "/" ? "/" : `/post/${cat.value}`}
                >
                  <li
                    className={`
                      text-white px-4 py-3 rounded-lg cursor-pointer
                      transition-all duration-300 transform
                      hover:bg-white/10 hover:translate-x-2
                      ${
                        pathName === (cat.value === "/" ? "/" : `/post/${cat.value}`)
                          ? "bg-[#4facfe] text-[#00007d] font-bold"
                          : ""
                      }
                    `}
                    style={{
                      animation: isMenuOpen 
                        ? `slideInRight 0.3s ease-out ${index * 0.05}s both`
                        : 'none'
                    }}
                  >
                    {cat.label}
                  </li>
                </Link>
              ))}
            </ul>

            {/* Mobile User Section */}
            <div className="p-6 border-t border-white/20">
              {user === null ? (
                <Link
                  href="/login"
                  className="block text-center bg-amber-50 text-[#00007d] px-4 py-3 rounded-xl font-semibold hover:bg-amber-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <Link
                  href={`/Dashboard?user=${singleUser?.name}&role=${singleUser?.role}`}
                  className="flex items-center gap-3 bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Image
                    className="w-10 h-10 rounded-full object-cover"
                    src={user?.photoURL || profileImg}
                    alt="Profile"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {singleUser?.name || 'User'}
                    </p>
                    <p className="text-white/60 text-xs">{singleUser?.role || 'Member'}</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;