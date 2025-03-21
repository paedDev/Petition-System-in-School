import React from "react";
import OptionInputTile from "../input/OptionInputTile";
import Rating from "../input/Rating";
import ImageOptionInputTile from "../input/ImageOptionInputTile";
const PollContent = ({
  type,
  option,
  selectedOptionIndex,
  onOptionSelect,
  rating,
  onRatingChange,
  userResponse,
  onResponseChange,
}) => {
  switch (type) {
    case "single-choice":
    case "yes/no":
      return (
        <>
          {option.map((opt, index) => (
            <OptionInputTile
              key={opt._id}
              isSelected={selectedOptionIndex === index}
              label={opt.optionText || ""}
              onSelect={() => onOptionSelect(index)}
            />
          ))}
        </>
      );
    case "rating":
      return <Rating value={rating} onChange={onRatingChange} />;

    case "open-ended":
      return (
        <div className="-mt-3">
          <textarea
            placeholder="Your Response"
            className="w-full text-[13ppx] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2"
            rows={4}
            value={userResponse}
            onChange={({ target }) => onResponseChange(target.value)}
          />
        </div>
      );

    case "image-based":
      return (
        <div className="grid grid-cols-2 gap-4">
          {option.map((opt, index) => (
            <ImageOptionInputTile
              key={opt._id}
              isSelected={selectedOptionIndex === index}
              imgUrl={opt.optionText || ""}
              onSelect={() => onOptionSelect(index)}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default PollContent;
