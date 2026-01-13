"use client";
import React, { useState } from "react";
import "./SideContent.css";

const SideContent = () => {
  const newsArray = [
    {
      img: "https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/612100380_122104887729192244_2806682581351881423_n.jpg?stp=dst-jpg_s565x565_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEfjRQDJ1XoRJD20UyNjmX88y1NnpZhsQbzLU2elmGxBhc4zr0Ty8zwHsZJivs3LvCMlCYHcw8DhWefjLmN6Ios&_nc_ohc=jvBVAStbeO8Q7kNvwH1HBeL&_nc_oc=AdkG4gj7p_Er2wBb_il9TN6HbkhqMYStZcuO0cVgCGxxDvpsuotXfAP0B1tKboqTToA&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=KZqjC-3Z29WS7EQcH4nkcQ&oh=00_AfqSU51cSIWMgzEbC-a7rR7RkqEYLrZ_TfAerqGNHKM7NA&oe=696C2941",
      headline: "ঢাকায় নতুন মেট্রোরেল চালু",
      description: "আজ থেকে ঢাকায় নতুন রুটে মেট্রোরেল চলাচল শুরু হয়েছে।",
    },
    {
      img: "https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/614905881_122243797874089912_3183486502617996051_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFlNmhhNmF-_MMvXgmzgYc_kcy-xx4ch4mRzL7HHhyHiVSIYfVFEXFcCJWURbINTxtXkuJOnkDTwAwKq6ikEk6_&_nc_ohc=2YuaxIEWjRQQ7kNvwHwXl4y&_nc_oc=AdnzA6jXiRRXabk007hcAVUqWuhYWQRppCFI5YyKrDrG1SrdxM7U0GkPtiHtAfObPC4&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=fd6JqBqnbrZLZiMtqKD_Jw&oh=00_AfrN3ruenX8FMd2q0O1dxwUlMmly9DUwOUmYcG-BBkY_hQ&oe=696C1430",
      headline: "বাংলাদেশ জিতেছে",
      description: "রোমাঞ্চকর ম্যাচে বাংলাদেশ দল জয় লাভ করেছে।",
    },
    {
      img: "https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/613914874_122243733314089912_6288390776718212757_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG51bTfLGtbPeFH2b5uxogl8txQhXDj2MTy3FCFcOPYxD80GBF-CtTek1tPPHqGAeQjJyLsYu8J_nblDOnHqDRb&_nc_ohc=mks5xjHADHoQ7kNvwHhv8wW&_nc_oc=Adl5FVvlEwDDEZMOFIT--vmrMWTAffQ3fABdtFxJVpKZ8R1vyoTK-WQueRKgv9nyE_g&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=7aQ8iXdcbwUy6HMNh0_8pQ&oh=00_AfoChfmmN7bjuOaGLYUjvlnMmxU9yy2QDZ2PJ-wGgX04dg&oe=696C1C60",
      headline: "আবহাওয়ার সতর্কতা",
      description: "আগামী ২৪ ঘণ্টায় ভারী বৃষ্টির সম্ভাবনা রয়েছে।",
    },
  ];
  //   console.log(newsArray);
  return (
    <div className="sideContentMain">
      {newsArray.map((news, index) => {
        return (
          <div className="sideCard" key={index}>
            <img className="sideImg" src={news.img} alt="" />
            <div>
              <h1>{news.headline}</h1>
              {/* <p>{news.description}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideContent;
