import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import "react-toastify/ReactToastify.css";
import { useState } from "react";
import RefresHandeler from "./pages/RefresHandeler";

function App() {
  // Functionality are use to user cant get a direct change a routing

  const [isAuthonticate, setIsAuthonticate] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthonticate ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <div className="">
        <RefresHandeler setIsAuthonticate={setIsAuthonticate} />
        <Routes>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singup" element={<Singup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
