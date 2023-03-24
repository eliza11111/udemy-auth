import { Routes, Route } from "react-router-dom";
import Register from "./components/Auth/AuthPages/Register";
import LogIn from "./components/Auth/AuthPages/LogIn";
import Home from "./components/Home/Home";
import HomePage from "./pages/HomePage/HomePage";
// import ChangePasswordPage from "./components/Auth/AuthPages/Change";
import Navbar from "./components/Navbar";
import LogOut from "./components/Auth/AuthPages/LogOut";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "./components/Auth/config/firebase";
import logging from "./components/Auth/config/logging";
import ForgotPasswordPage from "./components/Auth/AuthPages/Forgot";
import ResetPasswordPage from "./components/Auth/AuthPages/Reset";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        logging.info("Пользователь обнаружен!");
      } else {
        logging.info("Пользователь не найден!");
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress color="secondary" />;

  return (
    <>
      <Navbar />
      <Home />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LogIn name={""} location={undefined} />}
        />
        <Route
          path="/register"
          element={<Register name={""} location={undefined} />}
        />
        {/* <Route path="/change" element={<ChangePasswordPage name={""} />} /> */}
        <Route
          path="/logout"
          element={<LogOut name={""} location={undefined} />}
        />
        <Route
          path="/forget"
          element={<ForgotPasswordPage name={""} location={undefined} />}
        />
        <Route
          path="/reset"
          element={<ResetPasswordPage name={""} location={undefined} />}
        />
      </Routes>
      {/* <AuthPage />  */}
    </>
  );
}

export default App;
