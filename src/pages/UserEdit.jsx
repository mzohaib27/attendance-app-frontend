import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../Services/ApiCalls";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { updateUser } from "../Redux/AuthSlice";

const UserEdit = () => {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  console.log(userData);

  const getUserData = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/api/user/updateuser/${user._id}`,
        userData
      );
      const updatedUserInfo = response.data.updatedUser;
      console.log(updatedUserInfo);
      dispatch(updateUser(updatedUserInfo));
      toast.success("user updated successfully");
      navigate(`/userattendance`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log("Error : " + error);
    }
  };

  return (
    <div className="flexCenter w-full min-h-[100vh] bg-gradient-to-tr from-gray-800 via-indigo-600 to-purple-600">
      <div className="flex rounded-lg mx-auto bg-gray-200 flex-col gap-4 text-center px-8 md:px-12 lg:px-24 py-4 md:py-8 lg:py-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold italic">
          Edit Profile
        </h1>
        <form className="flexCenter w-full flex-col gap-2  focus:shadow-xl focus:shadow-purple-600  ">
          <div>
            <img
              src={user.profileimage}
              alt="profile-image"
              className="w-32 h-32 rounded-full"
            />
          </div>
          <input
            type="text"
            name="name"
            id="name"
            onChange={getUserData}
            defaultValue={user.name}
            className="px-2 py-1 rounded-lg bg-gray-300"
          />
          <input
            type="email"
            name="email"
            id="email"
            onChange={getUserData}
            defaultValue={user.email}
            className="px-2 py-1 rounded-lg bg-gray-300"
          />
          <input
            type="password"
            name="password"
            id="password"
            onChange={getUserData}
            defaultValue={user.password}
            className="px-2 py-1 rounded-lg bg-gray-300"
          />
          <button
            onClick={updateUserData}
            className="px-4 py-2 w-full rounded-lg bg-blue-600 text-white"
          >
            Update
          </button>
        </form>
        <Link to={"/userattendance"}>
          <button className="text-xs hover:underline cursor-pointer text-start">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserEdit;
