import { useContext } from "react";
import { AuthContext } from "@/app/Context/AuthContext";
import useUserData from "@/middleware/User";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const { allUser } = useUserData();

  const currentUser = allUser?.find(u => u.email === user?.email);
  const role = currentUser?.role;

  const isAdmin = role === "admin";
  const isEditor = role === "editor";
  const isUser = role === "user";

  return { role, isAdmin, isEditor, isUser };
};

export default useRole;
