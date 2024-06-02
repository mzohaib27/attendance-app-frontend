import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="flexCenter w-full min-h-[100vh] bg-gradient-to-tr from-gray-800 via-indigo-600 to-purple-600">
      <div className="flexStart flex-col gap-4 px-6 md:px-12 lg:px-24 py-6 md:py-8 rounded-xl bg-gray-200">
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold italic text-blue-600 py-4">
          Thank you!
        </h1>
        <p className="text-lg md:text-xl lg:text-3xl italic">
          You Submitted Your Attendance Successfully
        </p>
        <Link to={"/userattendance/userrecord"}>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
            View Records
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
