import React from "react";
import CharAvatar from "./CharAvatar";
import moment from "moment";
const UserProfileInfo = ({ imgUrl, fullname, userId, createdAt }) => {
  return (
    <div className="flex items-center gap-4 mx-5 ">
      {imgUrl ? (
        <img
          src={imgUrl}
          alt=""
          className="w-10 h-10 rounded-full border-none"
        />
      ) : (
        <CharAvatar fullName={fullname} style="text-[13px]" />
      )}
      <div>
        <p className="text-sm text-black font-medium leading-4">
          {fullname}{" "}
          <span className="mx-1 text-slate-500 text-2xl font-bold">⋅</span>
          <span className="text-sm text-[10px] text-slate-500">
            {""}
            {createdAt && moment(createdAt).fromNow()}
          </span>
        </p>
        <span className="text-[-11.5px] text-slate-500 leading-4">
          @{userId}
        </span>
      </div>
    </div>
  );
};

export default UserProfileInfo;
