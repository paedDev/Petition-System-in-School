import React from "react";
import bgImage from "../../assets/images/ICpepLogo.jpg";
import bgImage2 from "../../assets/images/BackgroundFinal.jpg";
import CharAvatar from "./CharAvatar";
const StatsInfo = ({ label, value }) => {
  return (
    <div className="text-center">
      <p className="font-medium text-gray-950">{value}</p>
      <p className="text-xs text-slate-700/80 mt-1 ">{label}</p>
    </div>
  );
};

const UserDetailsCard = ({
  profileImageUrl,
  fullname,
  userID,
  totalPollsVotes,
  totalPollsCreated,
  totalPollsBookmarked,
}) => {
  return (
    <div className="bg-slate-100/50 rounded-lg mt-16 overflow-hidden">
      <div
        className="w-full h-38 bg-cover  flex justify-center bg-green-400 relative"
        style={{ backgroundImage: `url(${bgImage2})` }}
      >
        <div className="absolute -bottom-10 rounded-full overflow-hidden border-2 border-green-200">
          {profileImageUrl ? (
            <img
              src={profileImageUrl || ""}
              alt="Profile Image"
              className="w-20 h-20 bg-slate-400 rounded-full"
            />
          ) : (
            <CharAvatar
              fullName={fullname}
              width="w-20"
              height="h-20"
              style="text-xl"
            />
          )}
        </div>
      </div>
      <div className="mt-12 px-5">
        <div className="text-center pt-1">
          <h5 className="text-lg text-gray-950 font-medium leading-6">
            {fullname}
          </h5>
          <span className="text-[13px] font-medium text-slate-700/60">
            @{userID}
          </span>
        </div>

        <div className="flex items-center justify-center gap-5 flex-wrap my-6 ">
          <StatsInfo label="Petition Created" value={totalPollsCreated || 0} />
          <StatsInfo label="Petition Voted" value={totalPollsVotes || 0} />
          <StatsInfo
            label="Petition Bookmarked"
            value={totalPollsBookmarked || 0}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
