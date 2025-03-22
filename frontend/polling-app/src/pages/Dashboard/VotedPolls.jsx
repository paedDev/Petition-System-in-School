import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths";
import PollCard from "../../components/PollCards/PollCard.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import EmptyCard from "../../components/cards/EmptyCard.jsx";
import CREATE_ICON from "../../assets/images/uc-logo.jpg";
const PAGE_SIZE = 3;
const VotedPolls = () => {
  useUserAuth();

  const navigate = useNavigate();

  const [votedPolls, setVotedPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchAllPolls = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.POLLS.VOTED_POLLS);
      console.log("API Response:", response.data); // Log the API response
      if (response.data?.polls?.length > 0) {
        setVotedPolls((prevPolls) => [...prevPolls, ...response.data.polls]);

        setHasMore(response.data.polls.length === PAGE_SIZE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.log(`Something wen wrong. Please try again`, error);
    } finally {
      setLoading(false);
    }
  };
  const loadMorePolls = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchAllPolls();

    return () => {};
  }, [page]);
  return (
    <DashboardLayout activeMenu="Voted Petition">
      <div className="my-5 mx-auto">
        <h2 className="text-xl font-medium text-black">Voted Petition</h2>
        {votedPolls.length === 0 && !loading && (
          <EmptyCard
            imgSrc={CREATE_ICON}
            message="You have not voted on any petition yet! Start exploring and share your opinion by voting on petition now!"
            btnText="Explore"
            onClick={() => navigate("/dashboard")}
          />
        )}
        <InfiniteScroll
          dataLength={votedPolls.length}
          next={loadMorePolls}
          hasMore={hasMore}
          loader={<h4 className="info-text">Loading...</h4>}
          endMessage={<p className="info-text">No more petition to display.</p>}
        >
          {votedPolls.map((poll) => (
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
          ))}
        </InfiniteScroll>
      </div>
    </DashboardLayout>
  );
};

export default VotedPolls;
