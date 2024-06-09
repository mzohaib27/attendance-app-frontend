import React, { useState } from "react";
import { Styles } from "../utils/Styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../Services/ApiCalls";

const Signup = () => {
  // initializing useNavigate
  const navigate = useNavigate();

  // initializing useStates
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    file: "",
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  // ImageBase64 Function
  const imageBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
    return data;
  };
  // HandleUpdateImage
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    const image = await imageBase64(file);
    setProfileImage(image);
    // image ? setProfileImage(image) :
  };
  console.log(profileImage);

  // getuserData Function
  const getuserData = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // submitData Function
  const submitData = async (e) => {
    e.preventDefault();
    if (
      userData.name === "" ||
      userData.email === "" ||
      userData.password === ""
    ) {
      setError("All Fields must be filled");
      setShowError(true);
    } else {
      setShowError(false);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      if (profileImage) {
        formData.append("file", profileImage);
      }

      try {
        const response = await api.post("/api/user/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status === 200) {
          setShowError(false);
          console.log("new user saved");
          toast.success("Registration Successfull.");
          navigate("/");
        }
      } catch (error) {
        console.log("Error while registering new user Error is : " + error);
        setError("Registration failed...");
        setShowError(true);
      }
    }
  };

  // Return Statement
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
            Sign up
          </h1>
          {setShowError ? <p className="text-lg text-red-400">{error}</p> : ""}
          <input
            type="text"
            name="name"
            id="name"
            onChange={getuserData}
            value={userData.name}
            placeholder="Enter Name"
            className="px-4 py-2 rounded-full focus:shadow-xl focus:shadow-purple-600 text-black"
          />
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
          <input
            type="file"
            name="file"
            id="uploadImage"
            onChange={handleUploadImage}
            placeholder="Choose Profile Picture"
            className="w-[13rem] text-white rounded-full focus:shadow-xl focus:shadow-purple-600 "
          />
          <button
            onClick={submitData}
            className="px-6 py-2 rounded-full bg-purple-700 w-full hover:bg-purple-800 hover-effect"
          >
            Register
          </button>
          <h1 className="flexStart gap-2 w-full pt-2 text-xs">
            <p>Already have an account</p>
            <Link to={"/signin"}>
              <button className="text-purple-600 hover:underline hover-effect">
                Sign in
              </button>
            </Link>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Signup;
