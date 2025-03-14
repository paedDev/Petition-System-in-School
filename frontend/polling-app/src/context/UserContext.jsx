import React, { createContext, useState } from 'react';
export const UserContext = createContext();
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    //update the user data
    const updateUser = (userData) => {
        setUser(userData);
    };
    const clearUser = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider
            value={{
                user
                , updateUser
                , clearUser
            }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;