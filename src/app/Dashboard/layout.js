import SadeBer from "@/component/shred/SadeBer/SadeBer";
import React from "react";
import "./dashboard.css";
const layout = ({ children }) => {
  return (
    <div className="dashboard">
      <SadeBer />
      {children}
    </div>
  );
};

export default layout;
