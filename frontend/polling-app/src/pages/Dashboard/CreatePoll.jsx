import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { UserContext } from "../../context/UserContext";
import { POLL_TYPE } from "../../utils/data.js";
import { OptionInput } from "../../components/input/OptionInput";
import OptionImageSelector from "../../components/input/OptionImageSelector";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import toast from "react-hot-toast";

const CreatePoll = () => {
  useUserAuth();
  const { user, onPollCreateOrDelete } = useContext(UserContext);

  const [pollData, setPollData] = useState({
    question: "",
    type: "",
    option: [],
    imageOption: [],
    error: "",
  });

  const handleValueChange = (key, value) => {
    setPollData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearData = () => {
    setPollData({
      question: "",
      type: "",
      option: [],
      imageOption: [],
      error: "",
    });
  };

  const updateImageAndGetLink = async (imageOption) => {
    const optionPromises = imageOption.map(async (imageOpt) => {
      try {
        const imgUploadRes = await uploadImage(imageOpt.file);
        return imgUploadRes.imageUrl || "";
      } catch (err) {
        toast.error(`Error uploading image: ${imageOpt.file.name}`);
        return "";
      }
    });

    const optionArr = await Promise.all(optionPromises);
    return optionArr;
  };

  const getOptions = async () => {
    switch (pollData.type) {
      case "single-choice":
        return pollData.option;
      case "image-based":
        return await updateImageAndGetLink(pollData.imageOption);

      default:
        return [];
    }
  };

  const handleCreatePoll = async () => {
    const { question, type, option, error, imageOption } = pollData;
    if (!question || !type) {
      console.log("CREATE:", "Question and Type are required");

      handleValueChange("error", "Question & Type are required");
      return;
    }
    if (type === "single-choice" && option.length < 2) {
      handleValueChange("error", "Enter at least two options");
      return;
    }
    if (type === "image-based" && imageOption.length < 2) {
      handleValueChange("error", "Enter at least two options");
      return;
    }

    handleValueChange("error", "");

    const optionData = await getOptions();
    try {
      const response = await axiosInstance.post(API_PATHS.POLLS.CREATE, {
        question,
        type,
        option: optionData,
        creatorId: user._id,
      });

      if (response) {
        toast.success("Poll Created Successfully");
        onPollCreateOrDelete();
        clearData();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        handleValueChange("error", error.response.data.message);
      } else {

        handleValueChange("error", "Something went wrong. Please try again.");

      }
    }
  };

  return (
    <DashboardLayout activeMenu="Create Petition">
      <div className="bg-gray-100/80 my-5 p-5 rounded-lg mx-auto">
        <h2 className="text-lg text-black font-medium">Create Petition</h2>
        <div className="mt-3">
          <label htmlFor="" className="text-xs font-medium text-slate-600">
            QUESTION
          </label>

          <textarea
            placeholder="Create a petition...."
            className="w-full text-[13px] text-black outline-none bg-slate-200/80 p-2 rounded-md mt-2"
            rows={4}
            value={pollData.question}
            onChange={({ target }) => handleValueChange("question", target.value)}
          />
        </div>

        <div className="mt-3 mb-3">
          <label htmlFor="" className="text-xs font-medium text-slate-600">
            POLL TYPE
          </label>
          <div className="flex gap-4 flex-wrap mt-3">
            {POLL_TYPE.map((item) => (
              <div
                key={item.value}
                className={`option-chip ${pollData.type === item.value
                  ? "text-white bg-green-400 border-green-300"
                  : "border-sky-100"
                  }`}
                onClick={() => handleValueChange("type", item.value)}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {pollData.type === "single-choice" && (
          <div className="mt-5">
            <label htmlFor="" className="text-xs font-medium text-slate-600">
              OPTIONS
            </label>
            <div className="mt-3">
              <OptionInput
                optionList={pollData.option}
                setOptionList={(value) => handleValueChange("option", value)}
              />
            </div>
          </div>
        )}

        {pollData.type === "image-based" && (
          <div className="mt-5">
            <label htmlFor="" className="text-xs font-medium text-slate-600">
              IMAGE OPTIONS
            </label>

            <div className="mt-3">
              <OptionImageSelector
                imageList={pollData.imageOption}
                setImageList={(value) => handleValueChange("imageOption", value)}
              />
            </div>
          </div>
        )}

        {pollData.error && (
          <p className="text-xs font-medium text-red-500">{pollData.error}</p>
        )}

        <button
          className="bg-green-400 w-full py-2 mt-6 rounded-md text-white text-sm"
          onClick={handleCreatePoll}
        >
          CREATE
        </button>
      </div>
    </DashboardLayout>
  );
};

export default CreatePoll;
