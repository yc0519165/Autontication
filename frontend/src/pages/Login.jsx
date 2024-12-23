import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handelError, handelSuccess } from "../util";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handelLoginChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handelLoginSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handelError("Email or Password are must be required...");
    }
    // Calling api
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToke, name, error } = result;
      localStorage.setItem("token", jwtToke);
      localStorage.setItem("loggedInUser", name);
      if (success) {
        handelSuccess(message);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handelError(details);
      } else if (!success) {
        handelError(message);
      }
    } catch (error) {
      handelError(error);
    }
  };
  return (
    <>
      {/* <div>
        <h1 className="text-3xl text-[#000]">Login page</h1>
        <form action="" onSubmit={handelLoginSubmit}>
          <div>
            <label htmlFor="">Email</label>
            <input
              onChange={handelLoginChange}
              value={loginInfo.email}
              type="email"
              name="email"
              placeholder="Enter Email id..."
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              onChange={handelLoginChange}
              value={loginInfo.password}
              type="password"
              name="password"
              placeholder="Enter Email id..."
              autoFocus
            />
          </div>
          <button type="submit">Login</button>
          <span>
            Dont have a account
            <p
              className="cursor-pointer font-bold"
              onClick={() => navigate("/singup")}
            >
              Go singup
            </p>
          </span>
        </form>
        <ToastContainer />
      </div> */}
      <div className="w-full h-screen px-6 md:px-10 lg:px-20 bg-[#F5F5F5] font-poppins selection:bg-[#C2F578] selection:text-black">
        <div className="h-[85vh] flex items-center justify-center">
          <div className="bg-[#ECEDEF] flex flex-col items-center py-7 px-14 rounded-2xl">
            <h1 className="text-xl font- text-center">Login</h1>
            <form onSubmit={handelLoginSubmit} className="mt-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  onChange={handelLoginChange}
                  value={loginInfo.email}
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  autoFocus
                  required
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  onChange={handelLoginChange}
                  value={loginInfo.password}
                  type="password"
                  name="password"
                  placeholder="Enter Email id..."
                  autoFocus
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-black bg-[#c2f578] rounded-md hover:bg-[#a5cf66] transition-colors ease-linear hover:text-black"
              >
                Login
              </button>
            </form>
            <span className="text-center text-sm pt-5">
              Dont have an account?
              <a
                onClick={() => navigate("/singup")}
                href=""
                className="underline"
              >
                Sing Up
              </a>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
