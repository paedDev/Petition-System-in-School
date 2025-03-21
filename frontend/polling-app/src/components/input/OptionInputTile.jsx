import React from "react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
const OptionInputTile = ({ isSelected, label, onSelect }) => {
  const getColors = () => {
    if (isSelected) return "text-white bg-green-400 border-green-100";
    return "text-black bg-slate-200/80 border-slate-200";
  };
  return (
    <button
      className={`w-[95%] items-center gap-2 px-4 py-2 mb-4 border border-slate-300 rounded-md ${getColors()} flex `}
      onClick={onSelect}
    >
      {isSelected ? (
        <MdRadioButtonChecked className="text-lg text-white" />
      ) : (
        <MdRadioButtonUnchecked className=" text-lg text-slate-400" />
      )}
      <span className="text-[13px]">{label}</span>
    </button>
  );
};

export default OptionInputTile;
