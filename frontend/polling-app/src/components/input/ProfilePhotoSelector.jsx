import React, { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash2 } from "react-icons/lu";

const ProfilePhotoSelector = ({ setImage, image }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // it will update the image
      setImage(file);
      //Generate preview of url from the file 
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6 ">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? <div className="w-20 h-20 flex items-center justify-center bg-sky-100 rounded-full relative">
        <LuUser className="text-4xl text-cyan-400" />
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded-full absolute -bottom-1 -right-1"
          onClick={onChooseFile}
        >
          <LuUpload />
        </button>
      </div> :
        <div className="relative">
          <img src={previewUrl} alt="Profile Picture"
            className="w-20 h-20 rounded-full object-cover" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1"
            onClick={handleRemoveImage}
          >
            <LuTrash2 />
          </button>
        </div>}
    </div>
  );
};

export default ProfilePhotoSelector;
