import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Styles } from "../utils/Styles";
import { api } from "../Services/ApiCalls";
import toast from "react-hot-toast";
import { FaRegUserCircle } from "react-icons/fa";

const Home = () => {
  const userData = useSelector((state) => state.auth.user);

  const [attendanc, setAttendance] = useState({
    userId: userData._id,
    status: "absent",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const checkAttendanceStatus = async () => {
      try {
        const response = await api.get(
          `/api/user/attendance/check/${userData._id}`
        );
        if (response.data.hasSubmitted) {
          setHasSubmitted(true);
        }
      } catch (error) {
        console.log("Failed to check attendance status Error is : " + error);
      }
    };
    checkAttendanceStatus();
  }, [userData._id]);

  // OnChange Function of Check Box
  const handleCheckBoxStatus = (e) => {
    setAttendance({
      ...attendanc,
      status: e.target.checked ? "present" : "absent",
    });
  };

  const ProfilePicture = userData.profileimage ? (
    userData.profileimage
  ) : (
    <FaRegUserCircle />
  );

  // Submit Attendance
  const submitAttendance = async () => {
    try {
      const response = await api.post("/api/user/attendance", attendanc);
      toast.success("Attendance Submitted Successfully.");
      setHasSubmitted(true);
    } catch (error) {
      console.log("Error while submitting attendance Error is : " + error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flexCenter w-full min-h-[100vh] bg-gradient-to-tr from-gray-800 via-indigo-600 to-purple-600">
      <div
        className={`flex flex-col gap-4 w-fit rounded-xl ${Styles.paddingX} ${Styles.paddingY} shadow-xl shadow-black bg-gray-300`}
      >
        <h1 className={`${Styles.heading}`}>User Name : {userData.name}</h1>
        <div className="flex">
          <Link to={"/userattendance/userprofile"}>
            <img
              src={ProfilePicture}
              className="rounded-full h-24 w-24 cursor-pointer"
              alt=""
            />
          </Link>
        </div>
        {hasSubmitted ? (
          <h1>You Already Submiited the Attendance</h1>
        ) : (
          <div className="flex items-center">
            <h1 className="text-3xl font-bold pr-4">Status : </h1>
            <input
              type="checkbox"
              className="w-5 h-5 cursor-pointer"
              onClick={handleCheckBoxStatus}
            />
          </div>
        )}
        <div className="flex gap-6 items-center">
          {hasSubmitted ? (
            <button
              disabled
              className="hover:bg-blue-300 hover-effect bg-blue-300 cursor-not-allowed px-4 py-2 rounded-lg text-white"
            >
              Submit
            </button>
          ) : (
            <Link to={"/userattendance/success"}>
              <button
                onClick={submitAttendance}
                className="hover:bg-blue-700 hover-effect bg-blue-600 px-4 py-2 rounded-lg text-white"
              >
                Submit
              </button>
            </Link>
          )}
          <Link to={"/userattendance/userrecord"}>
            <button className="hover:bg-blue-700 hover-effect bg-blue-600 px-4 py-2 rounded-lg text-white ">
              View
            </button>
          </Link>
          <Link to={`/userattendance/userprofile/${userData._id}`}>
            <button className="hover:bg-blue-700 hover-effect bg-blue-600 px-4 py-2 rounded-lg text-white ">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
