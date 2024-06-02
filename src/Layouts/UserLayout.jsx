import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserLayout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  });
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default UserLayout;
