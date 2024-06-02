import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";
import AdminLayout from "./Layouts/AdminLayout";
import AdminEdit from "./pages/AdminEdit";
import UserEdit from "./pages/UserEdit";
import UserLayout from "./Layouts/UserLayout";
import PublicLayout from "./Layouts/PublicLayout";
import UserRecord from "./pages/UserRecord";
import Success from "./pages/Success";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        {/* Public Access Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Signin />} />
          <Route path="register" element={<Signup />} />
        </Route>

        {/* Admin Access Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Admin />} />
          <Route path="edituser/:userId" element={<AdminEdit />} />
        </Route>
        {/* User Access Routes */}
        <Route path="/userattendance" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="userprofile" element={<UserEdit />} />
          <Route path="userrecord" element={<UserRecord />} />
          <Route path="success" element={<Success />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
