import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import AuthInput from "../../components/input/AuthInput";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage.js";
const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userID, setuserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate(null);

  //handle Sign Up From submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!fullName) {
      setError("Please enter your full name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!userID) {
      setError("Please enter your userID");
      return;
    }
    if (!password) {
      setError("Please enter your password");
      return;
    }
    setError("");
    let profileImageUrl = "";
    //Sign Up API
    try {
      //upload image
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        userID,
        email,
        password,
        profileImageUrl,
      });
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate("/login");
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
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black"> Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1 mb-2">
          Join us today by entering your details below
        </p>
        <form action="" onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AuthInput value={fullName} onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John" type="text" />
            <AuthInput
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="jannoelpaed@example.com"
              type="text"
            />
            <AuthInput
              value={userID}
              onChange={({ target }) => setuserID(target.value)}
              label="School ID"
              placeholder="19-5590-946"
              type="text"
            />
            <AuthInput
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Min 8 Characters"
              type="password"
            />


          </div>
          {error && <p className="text-red-500 text text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            CREATE ACCOUNT
          </button>
          <p className="text-sm text-slate-800 mt-3">
            Already have an account?{""}
            <Link className="font-medium text-cyan-400 underline " to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
