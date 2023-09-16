import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP"
import About from "./pages/About";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>

      <Routes>

        <Route 
          path="/" 
          element={
            <OpenRoute>
              <Home/>
            </OpenRoute>
          }
        />

        <Route 
          path="/signup" 
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />

        <Route 
          path="/login" 
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />

        <Route 
          path="/forgot-password" 
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />

        <Route 
          path="/update-password/:id" 
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />

        <Route 
          path="/verify-email" 
          element={
            <OpenRoute>
              <VerifyOTP/>
            </OpenRoute>
          }
        />

        <Route 
          path="/about" 
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />

      </Routes>

    </div>
  );
}

export default App;
