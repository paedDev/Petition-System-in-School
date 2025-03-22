import React, { useCallback, useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getPollBookmarked } from "../../utils/helper";
import UserProfileInfo from "../cards/serProfileInfo";
import PollActions from "./PollAction";
import PollContent from "./PollContent";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { toast } from "react-hot-toast";
import PollingResultContent from "./PollingResultContent.jsx";
const PollCard = ({
  pollId,
  question,
  type,
  option,
  voters,
  responses,
  creatorProfileImg,
  creatorName,
  creatorUserID,
  userHasVoted,
  isMyPoll,
  isPollClosed,
  createdAt,
}) => {
  const { user, onUserVoted, toggleBookmarkId, onPollCreateOrDelete } =
    useContext(UserContext);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [rating, setRating] = useState(0);
  const [userResponse, setUserResponse] = useState("");

  const [isVoteComplete, setIsVoteComplete] = useState(userHasVoted);
  const [pollResult, setPollResult] = useState({
    option,
    voters,
    responses,
  });
  const isPollBookmarked = getPollBookmarked(
    pollId,
    user.bookmarkedPolls || []
  );
  const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
  const [pollClosed, setPollClosed] = useState(isPollClosed || false);
  const [pollDeleted, setPollDeleted] = useState(false);

  const handleInput = (value) => {
    if (type === "rating") setRating(value);
    else if (type === "open-ended") setUserResponse(value);
    else setSelectedOptionIndex(value);
  };

  const getPostData = useCallback(() => {
    if (type === "open-ended") {
      return { responseText: userResponse, voterId: user._id };
    }
    if (type === "rating") {
      return { optionIndex: rating - 1, voterId: user._id };
    }
    return { optionIndex: selectedOptionIndex, voterId: user._id };
  }, [type, userResponse, rating, selectedOptionIndex, user]);

  const getPollDetail = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.POLLS.GET_BY_ID(pollId)
      );
      if (response.data) {
        const pollDetails = response.data;
        setPollResult({
          option: pollDetails.option || [],
          voters: pollDetails.voters.length || 0,
          responses: pollDetails.responses || [],
        });
        if (
          user &&
          pollDetails.voters &&
          pollDetails.voters.includes(user._id)
        ) {
          setIsVoteComplete(true);
        } else {
          setIsVoteComplete(false);
        }
      }
    } catch (error) {
      console.error("Error fetching poll details:", error);
    }
  };
  useEffect(() => {
    getPollDetail();
  }, [pollId]);

  const handleVoteSubmit = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.POLLS.VOTE(pollId),
        getPostData()
      );
      getPollDetail();
      onUserVoted();
      setIsVoteComplete(true);
      toast.success("Vote Submitted successfully");
    } catch (err) {
      console.log(err.response?.data?.message || "Error submitting vote");
    }
  };

  const toggleBookmark = async () => {
    try {
      const response = await axiosInstance.post(
        API_PATHS.POLLS.BOOKMARK(pollId)
      );
      toggleBookmarkId(pollId);
      setPollBookmarked((prev) => !prev);
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Error bookmarking petition"
      );
    }
  };
  const closePoll = async () => {
    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CLOSE(pollId));
      if (response.data) {
        setPollClosed(true);
        toast.success(response.data?.message || "Petition Closed Successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("Something went wrong. Please try again.", error);
    }
  };
  const deletePoll = async () => {
    try {
      const response = await axiosInstance.delete(
        API_PATHS.POLLS.DELETE(pollId)
      );
      if (response.data) {
        setPollDeleted(true);
        onPollCreateOrDelete();
        toast.success(
          response.data?.message || "Petition Deleted Successfully"
        );
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.log("Something went wrong. Please try again.", error);
    }
  };
  return (
    !pollDeleted && (
      <div className="bg-slate-100/50 my-5 py-5 rounded-lg border border-slate-100 mx-auto  ">
        <div className="flex items-start justify-between">
          <UserProfileInfo
            imgUrl={creatorProfileImg}
            fullname={creatorName}
            userId={creatorUserID}
            createdAt={createdAt}
          />

          <PollActions
            pollId={pollId}
            isVoteComplete={isVoteComplete}
            InputCaptured={
              !!(userResponse || selectedOptionIndex >= 0 || rating)
            }
            onVoteSubmit={handleVoteSubmit}
            isBookmarked={pollBookmarked}
            isMyPoll={isMyPoll}
            toggleBookmark={toggleBookmark}
            pollClosed={pollClosed}
            onClosePoll={closePoll}
            onDelete={deletePoll}
          />
        </div>
        <div className="ml-14 mt-3">
          <p className="text-4 text-black leading-8">{question}</p>
          <div className="mt-4">
            {isVoteComplete || isPollClosed ? (
              <PollingResultContent
                type={type}
                option={pollResult.option || []}
                voters={pollResult.voters}
                responses={pollResult.responses || []}
              />
            ) : (
              <PollContent
                type={type}
                option={option}
                selectedOptionIndex={selectedOptionIndex}
                onOptionSelect={handleInput}
                rating={rating}
                onRatingChange={handleInput}
                userResponse={userResponse}
                onResponseChange={handleInput}
              />
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default PollCard;
