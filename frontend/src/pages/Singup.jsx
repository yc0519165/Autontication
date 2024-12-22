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
      <div className="">
        <h1>Sing Up page</h1>
        <form onSubmit={handelSubmit}>
          <div>
            <label htmlFor="">UserName</label>
            <input
              onChange={handelChange}
              type="text"
              placeholder="Enter Username..."
              name="name"
              value={singupInfo.name}
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input
              onChange={handelChange}
              type="email"
              placeholder="Enter Email..."
              name="email"
              value={singupInfo.email}
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              onChange={handelChange}
              type="password"
              placeholder="Enter Password..."
              name="password"
              value={singupInfo.password}
              autoFocus
            />
          </div>
          <button type="submit">Sing Up</button>
          <span>
            Already have an account ? <Link to={"/login"}>Sing In</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Singup;
