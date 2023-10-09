import { useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { useAppSelector } from "@/store/hook";
// TODO add test

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
  const isAuth = useAppSelector(
    (state) => typeof state.token === "string" && state.token.length > 0
  );

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={isAuth ? <Home /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profile /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
