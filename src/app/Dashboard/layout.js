'use client'
import SadeBer from "@/component/shred/SadeBer/SadeBer";
import React, { useContext, useEffect } from "react";
import "./dashboard.css";
import { AuthContext } from "../Context/AuthContext";
import { useRouter } from "next/navigation";
const layout = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(()=>{
    if(!loading && !user){
        router.push('/login')
    }
  },[user, loading, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }


  return (
    <div className="dashboard">
      <SadeBer />
      {children}
    </div>
  );
};

export default layout;
