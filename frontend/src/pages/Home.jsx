import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handelError, handelSuccess } from "../util";
import { ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handelLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handelSuccess("User Logouted...");
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  //Products hardcord data showing you
  // Tokens are check and get the user data from server

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      const result = await response.json();
      console.log(result);
      setProducts(result);
    } catch (error) {
      handelError(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
      <div>
        <h1 className="text-5xl text-[#000]">{loggedInUser}</h1>
        <div>
          {products?.map((item, ind) => {
            return (
              <>
                <div key={ind}>
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                </div>
              </>
            );
          })}
        </div>
        <button onClick={handelLogOut}>Logout</button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home;
