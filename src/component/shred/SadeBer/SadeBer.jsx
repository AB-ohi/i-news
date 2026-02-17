"use client";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "@/app/Context/AuthContext";
import useUserData from "@/middleware/User";
import useRole from "@/middleware/useRole";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./sadeBer.css";
import Image from "next/image";
import emptyProfilePicture from "../../../../public/all_img/emptyProfilePicture.jpg";

const SideBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isAdmin, isEditor, isUser } = useRole();
  const { allUser } = useUserData();
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const singleUser = allUser?.find((u) => u.email === user?.email);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const adminLinks = [
    { name: "Profile", path: `/Dashboard?user=${singleUser?.displayName}&role=${singleUser?.role}` },
    { name: "Content Publish", path: `/Dashboard/content-publish` },
    { name: "User Manage", path: `/Dashboard/user-manage` },
    { name: "Post", path: `/Dashboard/post` },
    { name: "Home", path: `/` },
  ];

  const editorLinks = [
    { name: "Profile", path: `/Dashboard` },
    { name: "Post", path: `/Dashboard/post` },
    { name: "Content Publish", path: `/Dashboard/content-publish` },
  ];

  const userLinks = [
    { name: "Profile", path: `/Dashboard` },
  ];

  const getLinks = () => {
    if (isAdmin) return adminLinks;
    if (isEditor) return editorLinks;
    if (isUser) return userLinks;
    return [];
  };

  return (
    <>
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {user ? (
          <div className="sidebar-content">
            <Image
              className="profile-img"
              src={
                user.photoURL ||
                (singleUser && singleUser.photoURL) ||
                emptyProfilePicture
              }
              width={120}
              height={120}
              alt="Profile"
            />

            <nav className="sidebar-nav">
              {getLinks().map((link, index) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={index}
                    href={link.path}
                    className={`sidebar-link ${isActive ? "active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <button onClick={handleLogout} className="sidebar-link logout-btn">
                Logout
              </button>
            </nav>
          </div>
        ) : (
          <div className="sidebar-content">
            <p>User not found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
