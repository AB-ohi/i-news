"use client";
import React, { useState } from "react";
import "./SideContent.css";
 const newsArray = [
    {
      img: "https://www.bvnews24.com/media/imgAll/2024April/SM/edu-2601131307-SM.png",
      headline: "ঢাকায় নতুন রুটে আধুনিক মেট্রোরেল পরিষেবা আনুষ্ঠানিকভাবে চালু",
      description:
        "আজ থেকে ঢাকায় নতুন রুটে অত্যাধুনিক মেট্রোরেল পরিষেবা চালু করা হয়েছে। এর মাধ্যমে যাত্রীদের যাতায়াত আরও সহজ, দ্রুত ও নিরাপদ হবে বলে আশা করা হচ্ছে।",
    },
    {
      img: "https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/614905881_122243797874089912_3183486502617996051_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFlNmhhNmF-_MMvXgmzgYc_kcy-xx4ch4mRzL7HHhyHiVSIYfVFEXFcCJWURbINTxtXkuJOnkDTwAwKq6ikEk6_&_nc_ohc=2YuaxIEWjRQQ7kNvwHwXl4y&_nc_oc=AdnzA6jXiRRXabk007hcAVUqWuhYWQRppCFI5YyKrDrG1SrdxM7U0GkPtiHtAfObPC4&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=fd6JqBqnbrZLZiMtqKD_Jw&oh=00_AfrN3ruenX8FMd2q0O1dxwUlMmly9DUwOUmYcG-BBkY_hQ&oe=696C1430",
      headline:
        "রোমাঞ্চকর ম্যাচে শক্তিশালী প্রতিপক্ষকে হারিয়ে বাংলাদেশের দারুণ জয়",
      description:
        "উত্তেজনাপূর্ণ ও হাড্ডাহাড্ডি লড়াইয়ের পর শক্তিশালী প্রতিপক্ষকে পরাজিত করে বাংলাদেশ দল গুরুত্বপূর্ণ জয় অর্জন করেছে, যা সমর্থকদের মধ্যে আনন্দের জোয়ার বইয়ে দিয়েছে।",
    },
    {
      img: "https://scontent.fdac7-1.fna.fbcdn.net/v/t39.30808-6/613914874_122243733314089912_6288390776718212757_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG51bTfLGtbPeFH2b5uxogl8txQhXDj2MTy3FCFcOPYxD80GBF-CtTek1tPPHqGAeQjJyLsYu8J_nblDOnHqDRb&_nc_ohc=mks5xjHADHoQ7kNvwHhv8wW&_nc_oc=Adl5FVvlEwDDEZMOFIT--vmrMWTAffQ3fABdtFxJVpKZ8R1vyoTK-WQueRKgv9nyE_g&_nc_zt=23&_nc_ht=scontent.fdac7-1.fna&_nc_gid=7aQ8iXdcbwUy6HMNh0_8pQ&oh=00_AfoChfmmN7bjuOaGLYUjvlnMmxU9yy2QDZ2PJ-wGgX04dg&oe=696C1C60",
      headline:
        "দেশজুড়ে ভারী বৃষ্টিপাতের সম্ভাবনায় আবহাওয়া অধিদপ্তরের সতর্কতা জারি",
      description:
        "আবহাওয়া অধিদপ্তর জানিয়েছে, আগামী ২৪ ঘণ্টায় দেশের বিভিন্ন অঞ্চলে ভারী থেকে অতিভারী বৃষ্টিপাত হতে পারে। এ কারণে সংশ্লিষ্ট সবাইকে সতর্ক থাকার পরামর্শ দেওয়া হয়েছে।",
    },
  ];
const SideContent = () => {
 const lineSlice = (text,wordLimit = 7)=>{
    const words = text.split(' ');
    if(words.length >= wordLimit){
        return words.slice(0,wordLimit).join(' ')+'...more'
    }
 }
  return (
    <div className="sideContentMain">
      {newsArray.map((news, index) => {
        return (
          <div className="sideCard" key={index}>
            <img className="sideImg" src={news.img} alt="" />
            <div className="newsCardDetails">
              <h1>{lineSlice(news.headline, 7)}</h1>
              {/* <p>{news.description}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideContent;
