import { Routes, Route} from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import Signup from "./pages/SignUp/SignUp";
import HomePage from "./pages/Home/HomePage";
import ProtectedRoute from "./context/authContext";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat/:chatId" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;