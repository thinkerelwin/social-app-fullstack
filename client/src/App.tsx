import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { useAppSelector } from "@/store/hook";

import Home from "@/features/home/Home";
import Login from "@/features/login/Login";
import Profile from "@/features/profile/Profile";

import "./App.css";

function App() {
  const themeMode = useAppSelector((state) => state.themeMode);
  const theme = useMemo(
    () => createTheme(themeSettings(themeMode)),
    [themeMode]
  );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
