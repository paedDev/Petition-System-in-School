import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/input/AuthInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Handle Login form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    //Login API
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Please enter your details to log in
        </p>
        <form action="" onSubmit={handleLogin}>
          <AuthInput
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="jannoelpaed@example.com"
            type="text"
          />
          <AuthInput
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>
          <p className="text-sm text-slate-800 mt-3">
            Dont have an account?{""}
            <Link className="font-medium text-cyan-400 underline " to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;
