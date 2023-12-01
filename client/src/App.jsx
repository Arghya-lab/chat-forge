import "./App.css";
import { Routes, Route } from "react-router-dom"
import AuthPage from "./Components/Auth/AuthPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />}  />
    </Routes>
  );
}

export default App;
