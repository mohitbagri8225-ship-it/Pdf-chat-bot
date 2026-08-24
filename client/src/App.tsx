import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Signup from "./pages/SignUp/SignUp";
import HomePage from "./pages/Home/HomePage";
 

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat/:chatId" element={<HomePage/>} />

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;