import React from "react";

const PollOptionVoteResult = ({ label, optionVotes, totalVotes }) => {
  const progress =
    totalVotes > 0 ? Math.round((optionVotes / totalVotes) * 100) : 0;
  return (
    <div className="w-[95%] bg-slate-200/80 rounded-md h-6 relative mb-3">
      <div
        className="bg-sky-900/10 h-6 rounded-md"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-between text-gray-800 text-[12px] font-medium mx-4">
        {label} <span className="text-[11px] text-slate-500">{progress}%</span>
      </span>
    </div>
  );
};

const ImagePollResult = ({ optionVotes, totalVotes, imgUrl }) => {
  return (
    <div>
      <div className="w-[95%] bg-gray-800 flex items-center gap-2 mb-4 rounded-md overflow-hidden">
        <img src={imgUrl} alt="" className="w-full h-36 object-contain" />
      </div>
      <PollOptionVoteResult optionVotes={optionVotes} totalVotes={totalVotes} />
    </div>
  );
};
const PollingResultContent = ({ type, option, voters, responses }) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
    case "rating":
      return (
        <>
          {option.map((opt, index) => (
            <PollOptionVoteResult
              key={opt._id}
              label={`${opt.optionText} ${type === "rating" ? "Star" : ""}`}
              optionVotes={opt.votes}
              totalVotes={voters || 0}
            />
          ))}
        </>
      );
    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {option.map((opt, index) => (
            <ImagePollResult
              key={opt._id}
              imgUrl={opt.optionText || ""}
              optionVotes={opt.votes}
              totalVotes={voters || 0}
            />
          ))}
        </div>
      );
    // case "open-ended":
    //   return responses.map((response) => {
    //     return <OpenEndedPollResponse />;
    //   });
    default:
      return null;
  }

  return <div>PollingResultContent</div>;
};

export default PollingResultContent;
