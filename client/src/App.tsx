// import { useState } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import Home from "@/features/home/home";
import Login from "@/features/login/login";
import Profile from "@/features/profile/profile";

import "./App.css";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
