import React, { useContext } from "react";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import UserDetailsCard from "../cards/UserDetailsCard";
import { UserContext } from "../../context/UserContext";
import PopularPetition from "./PopularPetition";
const DashboardLayout = ({ children, activeMenu, stats, showStats }) => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="lg:hidden block">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="grow mx-5">{children}</div>
          <div className="hidden md:block mr-5">
            <UserDetailsCard
              profileImageUrl={user && user.profileImageUrl}
              fullname={user && user.fullName}
              userID={user && user.userID}
              totalPollsVotes={user && user.totalPollsVotes}
              totalPollsCreated={user && user.totalPollsCreated}
              totalPollsBookmarked={user && user.totalPollsBookmarked}
            />
            {showStats && stats?.length > 0 && (
              <PopularPetition stats={stats} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
