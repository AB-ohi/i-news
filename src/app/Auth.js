// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyBK0bQGFPXRlaDO-hxOC09aw_7NnTLBZZ8",
  authDomain: "i-news-24.firebaseapp.com",
  projectId: "i-news-24",
  storageBucket: "i-news-24.firebasestorage.app",
  messagingSenderId: "121695382029",
  appId: "1:121695382029:web:3a534da9712163e8b64344",
  measurementId: "G-4NF4ZMKJZX"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);