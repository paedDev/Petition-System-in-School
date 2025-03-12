import React from "react";
import ICpepLogo from "../../assets/images/icpep.jpg";
import UC_Logo from "../../assets/images/uc-logo.jpg";
import YearsOfExp from "../../assets/images/78.jpg";
import UcGate from "../../assets/images/infrontOfUc.jpg";
import { NavLink } from "react-router-dom";
import BackGroundRight from "../../assets/images/BackgroundFinal.jpg";
const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12 ">
        <h2 className="text-lg font-bold tracking-wider text-black">
          Petition System
        </h2>
        {children}
      </div>
      <div className="hidden md:block w-1/2 h-screen bg-sky-100 bg-cover bg-no-repeat bg-center overflow-hidden relative">
        <img
          src={BackGroundRight}
          alt="icpep logo"
          className="h-screen relative w-full "
        />
        <img
          src={UC_Logo}
          alt=""
          className="absolute lg:w-96 w-[70%] top-8 lg:left-[5%] left-[20%] shadow-xl shadow-green-100 rounded-xl px-4 py-4 hover:scale-105 duration-500"
        />
        <img
          src={ICpepLogo}
          alt=""
          className="absolute top-[5%] w-30 right-[5%] xl:block hidden"
        />
        <img
          src={UcGate}
          alt=""
          className="absolute top-60 w-[100%] h-[80%] shadow-xl rounded"
        />
        <img
          src={YearsOfExp}
          alt=""
          className="absolute bottom-10 right-10 lg:w-96 md:w-64 rounded-lg shadow-xl shadow-green-100 xl:block hidden z-1  "
        />
      </div>
    </div>
  );
};

export default AuthLayout;
