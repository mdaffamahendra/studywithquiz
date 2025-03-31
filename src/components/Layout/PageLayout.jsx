import React, { useEffect } from "react";
import Navbar from "../Element/Navbar";
import { useSelector } from "react-redux";
import Footer from "../Element/Footer";
import { Navigate } from "react-router-dom";

const PageLayout = ({ children }) => {
  const role = useSelector((state) => state.users.user.role);

  useEffect(() => {
    if (!role) {
      return <Navigate to="/login" replace />;
    }
  }, []);
  return (
    <div className="relative font-poppins bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900 w-full overflow-x-hidden">
      <Navbar role={role} />
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
