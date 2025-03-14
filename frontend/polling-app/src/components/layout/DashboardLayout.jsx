import React from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
const DashboardLayout = ({ children, activeMenu }) => {
    return (
        <div>
            <Navbar />
            <div className='max-[1080px]:hidden'>
                <SideMenu activeMenu={activeMenu} />
            </div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;