import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { stateRedux } from "../types";
import Page404 from "../pages/Page404";
import LogIn from "../pages/LogIn";
import { dir } from "i18next";
import Home from "../pages/Home";

export default function Container() {
  const isAuth = useSelector((state: stateRedux) => state.auth.authenticate);
  const language = useSelector((state: stateRedux) => state.language.language);

  useEffect(() => {
    document.documentElement.dir = dir(language);
    document.documentElement.lang = language;
  }, [language]);
  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Navigate to="login" />} />
          <Route path="login" element={<LogIn />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
