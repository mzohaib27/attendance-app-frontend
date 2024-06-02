import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../Services/ApiCalls";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserRecord = () => {
  const user = useSelector((state) => state.auth.user);

  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const getUserRecords = async () => {
      try {
        const response = await api.get(
          `/api/user/attendance/records/${user._id}`
        );
        console.log(response.data);
        setAttendanceRecords(response.data);
      } catch (error) {
        toast.error("Error while Fetching Attendance Records Error : " + error);
      }
    };
    getUserRecords();
  }, []);

  return (
    <div className="flexCenter w-full min-h-[100vh] bg-gradient-to-tr from-gray-800 via-indigo-600 to-purple-600">
      <div className="flexStart flex-col gap-4 rounded-xl bg-gray-300 px-6 md:px-12 lg:px-24 py-4 md:py-8 lg:py-12">
        <h1 className="text-2xl md:text-3xl pb-4">
          Attendance Record of{" "}
          <Link to={"/userattendance/userprofile"}>
            <span className="text-2xl md:text-4xl font-semibold hover:underline hover-effect cursor-pointer text-blue-600">
              {user.name}
            </span>
          </Link>
        </h1>
        <table>
          <thead className="">
            <tr>
              <th className="border border-black px-4 py-2">Date</th>
              <th className="border border-black px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords?.map((record) => (
              <tr>
                <td className="border border-black px-4 py-2">{record.date}</td>
                <td
                  className={`border border-black px-4 py-2 ${
                    record.status === "absent"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to={"/userattendance"}>
          <button className="px-4 py-2 rounded-xl bg-blue-600 text-white">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserRecord;
