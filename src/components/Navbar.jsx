import React from "react";
import { Styles } from "../utils/Styles";
import { Link, useNavigate } from "react-router-dom";
import { persistor } from "../Redux/Store.js";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Redux/AuthSlice.js";

const Navbar = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // Logout Function
  const logoutFuncion = async () => {
    navigate("/");
    dispatch(clearUser());
    await persistor.purge();
  };
  return (
    <div
      className={`px-4 md:px-8 lg:px-12 py-4 flexBetween bg-black text-white`}
    >
      <h1 className={`${Styles.heading}`}>Employee Management System</h1>
      <div className={`flex gap-4 items-center`}>
        {user ? (
          <button onClick={logoutFuncion}>Logout</button>
        ) : (
          <>
            <Link to={"/"}>
              <button>Sign in</button>
            </Link>
            <Link to={"/register"}>
              <h1>Register</h1>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
