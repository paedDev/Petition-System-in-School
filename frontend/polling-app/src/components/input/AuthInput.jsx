import React, { useState } from "react";
import { FaR, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const AuthInput = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label htmlFor="" className="text-sm text-slate-800">
        {label}
      </label>
      <div className="input-box">
        <input
          type={
            type == "password" ? (showPassword ? "text" : "password") : "text"
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={(e) => onChange(e)}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-blue-300 cursor-pointer"
                onClick={() => handleToggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400 cursor-pointer"
                onClick={() => handleToggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
