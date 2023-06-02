import React from "react";
import { Outlet, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { getItem } from "./utils/storage";

function ProtectedRoutes() {
  const token = getItem("token");

  return !token ? <Navigate to="/" /> : <Outlet />;
}

function MainRoutes(): JSX.Element {
  return (
    <React.Fragment>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/main" element={<Main />} />
        </Route>
      </Routes>
    </React.Fragment>
  );
}

export default MainRoutes;
