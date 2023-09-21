import React from "react";
import { DBLeftSection, DBRightSection } from "../components/Admin";

function Dashboard() {
  return (
    <div className="w-screen h-screen flex items-center ">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
}

export default Dashboard;
