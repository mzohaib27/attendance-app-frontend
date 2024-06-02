import React, { useEffect, useState } from "react";
import { api } from "../Services/ApiCalls";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await api
        .get("/api/admin/getuser")
        .then((res) => {
          const result = res.data.allUsers;
          console.log(result);
          setUsersData(result);
        })
        .catch((error) => {
          console.log("Error is " + error);
        });
    };
    getUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await api.post(`/api/admin/delete/${userId}`);
      setUsersData((prev) => prev.filter((user) => user._id !== userId));
      toast.success("User Deleted Successfully.");
    } catch (error) {
      console.log(`Error while deleting user Error is : ${error}`);
    }
  };

  // Handle View Function
  const handleView = (userid) => {
    navigate(`/admin/edituser/${userid}`);
  };

  return (
    <div className="flex flex-col justify-start items-center py-6 md:py-12 w-full min-h-[100vh] bg-gradient-to-br from-white via-pink-100 to-indigo-200">
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr className="">
            <th className="px-4 py-2 border text-center border-black">Name</th>
            <th className="px-4 py-2 border text-center border-black">Email</th>
            <th className="px-4 py-2 border text-center border-black">
              Record
            </th>
            <th className="px-4 py-2 border text-center border-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user, i) => (
            <tr key={user._id}>
              <td className="px-4 py-2 border text-center border-black">
                {user.name}
              </td>
              <td className="px-4 py-2 border text-center border-black">
                {user.email}
              </td>
              <td className="px-4 py-2 border text-center text-blue-600 border-black">
                <button onClick={() => handleView(user._id)}>View</button>
              </td>
              <td className="px-4 py-2 border text-center text-red-600 border-black">
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
