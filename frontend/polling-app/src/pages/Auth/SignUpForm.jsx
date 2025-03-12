import React, { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(null);

  //handle Sign Up From submit
  const handleSignUp = async () => {};
  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black"> Create an Account</h3>
        <p className="text-xs text-slate-700 mt-1 mb-2">
          Join us today by entering your details below
        </p>
        <form action="" onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;
