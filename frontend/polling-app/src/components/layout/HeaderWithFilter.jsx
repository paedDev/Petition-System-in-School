import React, { useState } from "react";
import { IoCloseOutline, IoFilterOutline } from "react-icons/io5";
import { POLL_TYPE } from "../../utils/data.js";
const HeaderWithFilter = ({ title, filterType, setFilterType }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="sm:text-xl font-medium text-black">{title}</h2>

        <button
          className={`flex items-center gap-3 text-sm text-white bg-green-400 px-4 py-2
            ${open ? "rounded-t-lg" : "rounded-lg"}
            `}
          onClick={() => {
            if (filterType !== "") setFilterType("");
            setOpen(!open);
          }}
        >
          {filterType !== "" ? (
            <>
              <IoCloseOutline className="text-lg" />
              Clear
            </>
          ) : (
            <>
              <IoFilterOutline className="text-lg" />
              Filter
            </>
          )}
        </button>
      </div>

      {open && (
        <div className="flex flex-wrap gap-4 bg-green-400 p-4 rounded-l-lg rounded-b-lg">
          {[{ label: "All", value: "" }, ...POLL_TYPE].map((type) => (
            <button
              key={type.value}
              className={`text-[12px] px-4 py-1 rounded-lg text-nowrap ${
                filterType == type.value
                  ? "text-white bg-green-800"
                  : "text-[13px] bg-green-100"
              }`}
              onClick={() => {
                setFilterType(type.value);
              }}
            >
              {type.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderWithFilter;
