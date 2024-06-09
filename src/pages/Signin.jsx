import React, { useEffect, useState } from "react";
import { Styles } from "../utils/Styles";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../Services/ApiCalls";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { SetUsers } from "../Redux/AuthSlice";

const Signin = () => {
  // initializing useNavigate
  const navigate = useNavigate();
  // initializing useDispatch
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.user);
  console.log(userInfo);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  // getUserData Function
  const getuserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // submitData Function
  const submitData = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      setError("All Fields must be filled");
      setShowError(true);
    } else {
      setError("");
      setShowError(false);
      try {
        const response = await api.post("/api/user/login", userData);
        console.log(response.data);
        // Saving User Info
        if (response.data.success) {
          const userInformation = response.data.userinfo;
          console.log(userInformation);
          dispatch(SetUsers(userInformation));
          // Checking User Role
          if (userInformation && userInformation.role === "admin") {
            navigate("/admin");
          } else if (userInformation && userInformation.role === "user") {
            navigate("/userattendance");
          } else {
            navigate("/");
          }
        }

        toast.success("Log in successfull.");
      } catch (error) {
        toast.error("Something Went Wrong!");
        setError("Login Failed ");
        setShowError(true);
        console.log(`Error while login is Error : ${error}`);
      }
    }
  };

  return (
    <>
      <div
        className={`${Styles.paddingX} ${Styles.paddingY} bg-gradient-to-br from-black via-gray-950 to-purple-600 h-[100vh]`}
      >
        <div
          className={`flex flex-col gap-4 px-6 md:px-12 lg:px-24 py-4 md:py-8 lg:py-16 rounded-xl bg-gray-800  text-white mx-auto w-fit flexStart shadow-2xl shadow-black`}
        >
          <h1
            className={`text-2xl md:text-5xl font-semibold py-4 px-6 rounded-full hover:shadow-xl hover:shadow-purple-600 cursor-pointer hover-effect`}
          >
            Sign in
          </h1>
          {setShowError ? <p className="text-xs text-red-500">{error}</p> : ""}
          <input
            type="email"
            name="email"
            id="email"
            onChange={getuserData}
            value={userData.email}
            placeholder="Enter Email"
            className="px-4 py-2 rounded-full focus:shadow-xl focus:shadow-purple-600 text-black"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={getuserData}
            value={userData.password}
            placeholder="Enter Password"
            className="px-4 py-2 rounded-full focus:shadow-xl focus:shadow-purple-600 text-black"
          />
          <button
            onClick={submitData}
            className="px-6 py-2 rounded-full bg-purple-700 w-full hover:bg-purple-800 hover-effect"
          >
            Log in
          </button>
          <p className="flexStart gap-2 w-full pt-2 text-xs">
            <h1>Don't have an account</h1>
            <Link to={"/register"}>
              <button className="text-purple-600 hover:underline hover-effect">
                Register
              </button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signin;
