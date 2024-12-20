import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateRedux } from "../types";
import Page404 from "../pages/Page404";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import { dir } from "i18next";
import Home from "../pages/Home";
import Lawyer from "../pages/Lawyer"; // Main Lawyer component for displaying a specific lawyer's details
import Nav from "../components/nav/Nav";
import Lawyers from "../pages/Lawyers"; // List of lawyers
import About from "../pages/About";
import Footer from "../components/Footer/Footer";

export default function Container() {
  const isAuth = useSelector((state: stateRedux) => state.auth.authenticate);
  const language = useSelector((state: stateRedux) => state.language.language);

  useEffect(() => {
    document.documentElement.dir = dir(language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <BrowserRouter>
      {!isAuth ? (
        <Routes>
          <Route path="/" element={<Navigate to="SignUp" />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="SignIn" element={<SignIn />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      ) : (
        <div>
          <Nav />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/SignUp" element={<Navigate to="/home" />} />
            <Route path="/SignIn" element={<Navigate to="/home" />} />
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="lawyers" element={<Lawyers />} />
            <Route path="lawyers/:id" element={<Lawyer />} />{" "}
            {/* Nested Lawyer route */}
            <Route path="*" element={<Page404 />} />
          </Routes>
          <Footer />
        </div>
      )}
    </BrowserRouter>
  );
}
