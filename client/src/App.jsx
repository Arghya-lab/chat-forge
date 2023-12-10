import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./Components/Auth/AuthPage";
import HomePage from "./Components/HomePage";
import RequireAuth from "./Components/Auth/RequireAuth";
import ServerInvite from "./Components/ServerInvite";
import "./app.css";

function App() {
  const { selectedMode } = useSelector((state) => state.info); // 0 -> auto, 1 -> light, 2-> dark

  useEffect(() => {
    if (
      selectedMode === 2 ||
      (selectedMode === 0 &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selectedMode]);

  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />
      <Route
        path="/invite/:inviteCode"
        element={
          <RequireAuth>
            <ServerInvite />
          </RequireAuth>
        }
      />
    </Routes>
  );
}

export default App;
