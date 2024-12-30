import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handelError, handelSuccess } from "../util";

const Singup = () => {
  const navigate = useNavigate();
  const [singupInfo, setSingupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handelChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySingupInfo = { ...singupInfo };
    copySingupInfo[name] = value;
    setSingupInfo(copySingupInfo);
  };
  console.log(singupInfo);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = singupInfo;
    if (!name || !email || !password) {
      return handelError("username, email, password are must be required...");
    }

    // Calling the api with post method
    try {
      const url = "http://localhost:8080/auth/singup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(singupInfo),
      });
      const reeult = await response.json();
      const { success, message, error } = reeult;
      if (success) {
        handelSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message;
        handelError(details);
      } else if (!success) {
        handelError(message);
      }
      console.log(reeult);
    } catch (error) {
      handelError(error);
    }
  };
  return (
    <>
      <div className="w-full h-screen px-6 md:px-10 lg:px-20 bg-[#F5F5F5] font-poppins selection:bg-[#C2F578] selection:text-black">
        <div className="h-[85vh] flex items-center justify-center">
          <div className="bg-[#ECEDEF] flex flex-col items-center py-7 px-14 rounded-2xl">
            <h1 className="text-xl font- text-center">Sign Up</h1>
            <form onSubmit={handelSubmit} className="mt-6">
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  UserName
                </label>
                <input
                  onChange={handelChange}
                  type="text"
                  placeholder="Enter Username..."
                  name="name"
                  value={singupInfo.name}
                  autoFocus
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={handelChange}
                  type="email"
                  placeholder="Enter Email..."
                  name="email"
                  value={singupInfo.email}
                  autoFocus
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor=""
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  onChange={handelChange}
                  type="password"
                  placeholder="Enter Password..."
                  name="password"
                  value={singupInfo.password}
                  autoFocus
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 mt-4 text-black bg-[#c2f578] rounded-md hover:bg-[#a5cf66] transition-colors ease-linear hover:text-black"
              >
                SignUp
              </button>
            </form>
            <span className="text-center text-sm pt-5">
              Already have an account?
              <a
                onClick={() => navigate("/login")}
                className="cursor-pointer underline"
              >
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Singup;
