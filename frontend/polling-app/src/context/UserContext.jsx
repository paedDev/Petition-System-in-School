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
    const updateUserStats = (key, value) => {
        setUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };
    const onPollCreateOrDelete = (type = "create") => {
        const totalPollsCreated = user.totalPollsCreated || 0;
        updateUserStats(
            "totalPollsCreated",
            type == "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
        );
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