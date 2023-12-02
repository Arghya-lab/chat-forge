import "./app.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./Components/Auth/AuthPage";
import HomePage from "./Components/HomePage";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}

export default App;
