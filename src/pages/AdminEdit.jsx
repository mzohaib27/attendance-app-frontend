import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../Services/ApiCalls";
import { Styles } from "../utils/Styles";
import toast from "react-hot-toast";

const AdminEdit = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // console.log(user);
  // console.log(attendanceRecords);

  useEffect(() => {
    const getUserDetails = async () => {
      const response = await api
        .get(`/api/admin/user/${userId}`)
        .then((resp) => {
          console.log(resp.data);
          console.log(resp.data.attendanceRecord);
          setUser(resp.data.user);
          setAttendanceRecords(resp.data.attendanceRecord);
        })
        .catch((error) => {
          console.log(
            `Error while fetching user detail in admin edit page : Error is : ${error}`
          );
        });
    };
    getUserDetails();
  }, []);

  const handlSaveChange = async () => {
    await Promise.all(
      attendanceRecords.map((record) =>
        api.post(`/api/admin/update/${record._id}`, {
          userId: record.userId,
          date: record.date,
          status: record.status,
        })
      )
    )
      .then((resp) => {
        toast.success("Record updated successfully.");
      })
      .catch((error) => {
        toast.error("Error while updating");
        console.log(`Error while updating Error is : ${error}`);
      });
  };
  // handleStatusChange Function
  const handleStatusChange = (recordId, status) => {
    setAttendanceRecords(
      attendanceRecords.map((record) =>
        record._id === recordId ? { ...record, status } : record
      )
    );
  };
  return (
    <div className="flex flex-col items-center justify-start text-white w-full min-h-[100vh] bg-gradient-to-tr from-gray-800 via-indigo-600 to-purple-600">
      <h1 className="text-2xl md:text-5xl font-lighter py-6">
        Admin Edit Page
      </h1>
      <div
        className={`${Styles.padding} text-black rounded-lg mx-auto bg-gray-200`}
      >
        <h1>
          Attendance Record of{" "}
          <span className="text-xl font-semibold">
            {" "}
            {user ? user.name : <h1>Loading...</h1>}
          </span>
        </h1>
        <table>
          <thead>
            <tr>
              <th className="border border-black px-4 py-2">Date</th>
              <th className="border border-black px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords?.map((data, i) => (
              <tr>
                <td className="border border-black px-4 py-2">
                  {new Date(data.date).toLocaleString()}
                </td>
                <td className="border border-black px-4 py-2">
                  <select
                    value={data.status}
                    onChange={(e) =>
                      handleStatusChange(data._id, e.target.value)
                    }
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={handlSaveChange}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white my-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminEdit;
