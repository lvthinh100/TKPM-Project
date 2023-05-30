import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../pages/Layout.js";

import HomePage from "../pages/HomePage.js";
import DashboardPage from "../pages/DashboardPage.js";
import UserInfoPage from "../pages/UserInfoPage.js";

export default function MyRouter() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/userInfo" element={<UserInfoPage />} />
      </Routes>
    </Layout>
  );
}
