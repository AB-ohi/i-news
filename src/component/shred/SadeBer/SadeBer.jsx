"use client";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/Context/AuthContext";
import useUserData from "@/middleware/User";
import useRole from "@/middleware/useRole";
import Link from "next/link";
import { useRouter } from "next/navigation";
import './sadeBer.css';
import Image from "next/image";
import emptyProfilePicture from "../../../../public/all_img/emptyProfilePicture.jpg"

const SideBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isAdmin, isEditor, isUser } = useRole();
  const { allUser } = useUserData();
  const router = useRouter();

  // Get current user data
  const singleUser = allUser?.find(u => u.email === user?.email);
  console.log(singleUser)

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Admin Links
  const adminLinks = [
    { name: "Profile", path: `/Dashboard?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "Content Publish", path: `/Dashboard/content-publish?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "User Manage", path: `/Dashboard/user-manage?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "Post", path: `/Dashboard/post?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "Home", path: '/' },
  ];

  // Editor Links
  const editorLinks = [
    { name: "Profile", path: `/Dashboard?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "Post", path: `/Dashboard/post?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "Content Publish", path: `/Dashboard/content-publish?user=${singleUser?.displayName}&role=${singleUser?.role}` },
  ];

  // User Links
  const userLinks = [
    { name: "Profile", path: `/Dashboard?user=${singleUser?.displayName}&role=${singleUser?.role}` },
  ];

  return (
    <div className="sidebar">
      {
        user? (
          isAdmin ? (
        <div className="sidebar-content">
         
                <Image className="w-3/6 align-middle flex m-auto rounded-full" 
                src={
                  user.photoURL ||
                  (singleUser && singleUser.photoURL) ||
                  emptyProfilePicture
                }
                 width={500}
  height={500}
                alt=""/>
             
          <nav className="sidebar-nav">
            {adminLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className="sidebar-link"
              >
                {link.name}
              </Link>
            ))}
            <button onClick={handleLogout} className="sidebar-link logout-btn">
              Logout
            </button>
          </nav>
        </div>
      ) : isEditor ? (
        <div className="sidebar-content">
          <h3 className="role-badge">Editor</h3>
          <nav className="sidebar-nav">
            {editorLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className="sidebar-link"
              >
                {link.name}
              </Link>
            ))}
            <button onClick={handleLogout} className="sidebar-link logout-btn">
              Logout
            </button>
          </nav>
        </div>
      ) : isUser ? (
        <div className="sidebar-content">
          <h3 className="role-badge">User</h3>
          <nav className="sidebar-nav">
            {userLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.path}
                className="sidebar-link"
              >
                {link.name}
              </Link>
            ))}
            <button onClick={handleLogout} className="sidebar-link logout-btn">
              Logout
            </button>
          </nav>
        </div>
      ) : (
        <div className="sidebar-content">
          <p>Loading...</p>
        </div>
      )
        ):(
          <div> user can't found</div>
        )
      }
    </div>
  );
};

export default SideBar;