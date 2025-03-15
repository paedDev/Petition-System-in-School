import React, { useContext } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import UserDetailsCard from '../cards/UserDetailsCard';
import { UserContext } from '../../context/UserContext';
const DashboardLayout = ({ children, activeMenu }) => {
    const { user } = useContext(UserContext);
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                <div className='grow mx-5'>
                    {children}
                </div>
                <div className='hidden md:block mr-5'>

                    <UserDetailsCard
                        profileImageUrl={user && user.profileImageUrl}
                        fullname={user && user.fullName}
                        userID={user && user.userID}
                        totalPollsVoted={user && user.totalPollsVoted}
                        totalPollsCreated={user && user.totalPollsCreated}
                        totalPollsBookmarked={user && user.totalPollsBookmarked}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;