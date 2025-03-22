import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCards/PollCard.jsx";
import EmptyCard from "../../components/cards/EmptyCard.jsx";
import CREATE_ICON from "../../assets/images/uc-logo.jpg";
import { UserContext } from "../../context/UserContext.jsx";
const PAGE_SIZE = 3;
const BookMarks = () => {
  useUserAuth();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookmarkedPolls, setBookmarkedPolls] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.GET_BOOKMARKED);
      console.log("API Response:", response.data); // Log the API response
      if (response.data?.bookmarkedPolls?.length > 0) {
        setBookmarkedPolls(response.data.bookmarkedPolls);
      }
    } catch (error) {
      console.log(`Something wen wrong. Please try again`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPolls();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu="Bookmarks">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Bookmarks</h2>
        {bookmarkedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="You have not voted on any petition yet! Start exploring and share your opinion by voting on petition now!"
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}

        {bookmarkedPolls.map((poll) => {
          if (!user.bookmarkedPolls?.includes(poll._id)) return null;

          return (
            <PollCard
              key={`dashboard_${poll._id}`}
              pollId={poll._id}
              question={poll.question}
              type={poll.type}
              option={poll.option}
              voters={poll.voters.length || 0}
              responses={poll.responses || []}
              creatorProfileImg={poll.creator.profileImageUrl || null}
              creatorName={poll.creator.fullName}
              creatorUserID={poll.creator.userID}
              userHasVoted={poll.userHasVoted || false}
              isPollClosed={poll.closed || false}
              createdAt={poll.createdAt || false}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
};

export default BookMarks;
