import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Styles } from "../utils/Styles";
import { api } from "../Services/ApiCalls";
import toast from "react-hot-toast";

const Home = () => {
  const userData = useSelector((state) => state.auth.user);
  console.log(userData.profileimage);
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

  const handleCheckBoxStatusOfLeave = (e) => {
    setAttendance({
      ...attendanc,
      status: e.target.checked ? "absent" : "present",
    });
  };

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
        <h1 className={`${Styles.heading}`}>Employee Name : {userData.name}</h1>
        <div className="flex">
          <Link to={"/userattendance/userprofile"}>
            <img
              src={userData.profileimage}
              className="rounded-full h-24 w-24 cursor-pointer"
              alt=""
            />
          </Link>
        </div>
        {hasSubmitted ? (
          <h1>You Already Submiited the Attendance</h1>
        ) : (
          <div className="flex">
            <h1 className="text-3xl font-bold pr-4">Status : </h1>
            <select className="focus:outline-none px-2 py-1 rounded bg-gray-100">
              <option>
                Present{" "}
                <input
                  className="mx-4 cursor-pointer"
                  type="checkbox"
                  onChange={handleCheckBoxStatus}
                />
              </option>
              <option>
                Leave{" "}
                <input
                  className="mx-4 cursor-pointer"
                  type="checkbox"
                  onChange={handleCheckBoxStatusOfLeave}
                />
              </option>
            </select>
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
          <Link to={"/userattendance/userprofile"}>
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
