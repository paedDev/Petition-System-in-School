import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { getPollBookmarked } from "../../utils/helper";
import UserProfileInfo from "../cards/UserProfileInfo";
import PollActions from "./PollAction";
import PollContent from "./PollContent";

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
  const { user } = useContext(UserContext);
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
    user.bookmarkedPools || []
  );
  const [pollBookmarked, setPollBookmarked] = useState(isPollBookmarked);
  const [pollClosed, setPollClosed] = useState(isPollClosed || false);
  const [pollDeleted, setPollDeleted] = useState(false);

  const handleInput = (value) => {
    if (type === "rating") setRating(value);
    else if (type === "open-ended") setUserResponse(value);
    else setSelectedOptionIndex(value);
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
            onVoteSubmit={() => {}}
            isBookmarked={pollBookmarked}
            isMyPoll={isMyPoll}
            toggleBookmark={() => {}}
            pollClosed={pollClosed}
            onDelete={() => {}}
          />
        </div>
        <div className="ml-14 mt-3">
          <p className="text-4 text-black leading-8">{question}</p>
          <div className="mt-4">
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
          </div>
        </div>
      </div>
    )
  );
};

export default PollCard;
