import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import HomeDashboard from "./HomeDashboard";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <Outlet />
    </div>
  );
};

export default Dashboard;
