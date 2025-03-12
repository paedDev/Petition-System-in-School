import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ setImage, image }) => {
  const inputRef = useRef(null);
  const [perviewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {};
  const handleRemoveImage = () => {};
  const onChooseFile = () => {};

  return (
    <div className="flex justify-center mb-6 ">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative">
        <LuUser className="text-4xl text-cyan-400" />
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full absolute -bottom-1 -right-1"
          onClick={onChooseFile}
        >
          <LuUpload />
        </button>
      </div>
    </div>
  );
};

export default ProfilePhotoSelector;
