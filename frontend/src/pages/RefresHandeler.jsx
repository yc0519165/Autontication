import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RefresHandeler = ({ setIsAuthonticate }) => {
  const lacotion = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthonticate(true);
    }
    if (
      lacotion.pathname === "/" ||
      lacotion.pathname === "/login" ||
      lacotion.pathname === "/singup"
    ) {
      navigate("/home", { replace: false });
    }
  }, [location, navigate, setIsAuthonticate]);
  return null;
};

export default RefresHandeler;
