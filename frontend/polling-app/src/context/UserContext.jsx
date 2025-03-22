import React, { createContext, useState, useEffect } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateUserStats = (key, value) => {
    setUser((prev) => {
      const updatedUser = { ...prev, [key]: value };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const onUserVoted = () => {
    const totalPollsVotes = user?.totalPollsVotes || 0;
    updateUserStats("totalPollsVotes", totalPollsVotes + 1);
  };

  const onPollCreateOrDelete = (type = "create") => {
    const totalPollsCreated = user?.totalPollsCreated || 0;
    updateUserStats(
      "totalPollsCreated",
      type === "create" ? totalPollsCreated + 1 : totalPollsCreated - 1
    );
  };

  const toggleBookmarkId = (id) => {
    const bookmarks = user?.bookmarkedPolls || [];
    const index = bookmarks.indexOf(id);

    let updatedUser;
    if (index === -1) {
      updatedUser = {
        ...user,
        bookmarkedPolls: [...bookmarks, id],
        totalPollsBookmarked: (user.totalPollsBookmarked || 0) + 1,
      };
    } else {
      updatedUser = {
        ...user,
        bookmarkedPolls: bookmarks.filter((item) => item !== id),
        totalPollsBookmarked: (user.totalPollsBookmarked || 0) - 1,
      };
    }
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        clearUser,
        onUserVoted,
        onPollCreateOrDelete,
        toggleBookmarkId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
