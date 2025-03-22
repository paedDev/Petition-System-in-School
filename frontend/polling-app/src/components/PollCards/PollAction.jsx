import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
const PollActions = ({
  isVoteComplete,
  InputCaptured,
  onVoteSubmit,
  isBookmarked,
  toggleBookmark,
  isMyPoll,
  pollClosed,
  onClosePoll,
  onDelete,
}) => {
  const [loading, setLoading] = useState(false);
  const handleVoteClick = async () => {
    setLoading(true);
    try {
      await onVoteSubmit();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-1">
      {(isVoteComplete || pollClosed) && (
        <div className="text-[11px] font-medium text-slate-700 bg-slate-200 px-3 py-1 rounded-md">
          {pollClosed ? "Closed" : "Voted"}
        </div>
      )}
      {isMyPoll && !pollClosed && (
        <button
          className="btn-small text-orange-500 bg-orange-500/20 hover:bg-orange-500 hover:text-white hover:border-orange-100 transition duration-500"
          onClick={onClosePoll}
          disabled={loading}
        >
          Close
        </button>
      )}
      {isMyPoll && (
        <button
          className="btn-small text-red-500 bg-red-500/20 hover:bg-red-500 hover:text-white hover:border-red-100 transition duration-500"
          onClick={onDelete}
          disabled={loading}
        >
          Delete
        </button>
      )}
      <button className="icon-btn px-5" onClick={toggleBookmark}>
        {isBookmarked ? (
          <FaBookmark className="text-green-400" />
        ) : (
          <FaRegBookmark />
        )}
      </button>
      {InputCaptured && !isVoteComplete && (
        <button
          className="btn-small mr-5"
          onClick={handleVoteClick}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      )}
    </div>
  );
};

export default PollActions;
