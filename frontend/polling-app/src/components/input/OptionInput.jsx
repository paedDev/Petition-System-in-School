import React, { useState } from 'react';
import { HiOutlineTrash, HiMiniPlus } from "react-icons/hi2";

export const OptionInput = ({ optionList = [], setOptionList }) => {
    const [option, setOption] = useState("");

    // Adding an option
    const handleAddOption = () => {
        if (option.trim() && optionList.length < 4) {
            setOptionList([...optionList, option.trim()]); // Correct function
            setOption(""); // Clear input field
        }
    };

    // Deleting an option
    const handleDeleteOption = (index) => {
        const newList = optionList.filter((_, i) => i !== index);
        setOptionList(newList);
    };

    return (
        <div>
            {optionList.map((item, index) => (
                <div key={index} className='flex justify-between bg-gray-200/80 px-4 py-2 rounded-md mb-3'>
                    <p className='text-xs font-medium text-black'>{item}</p>
                    <button onClick={() => handleDeleteOption(index)}>
                        <HiOutlineTrash className="text-lg text-red-500" />
                    </button>
                </div>
            ))}

            {optionList.length < 4 && (
                <div className='flex items-center gap-5 mt-4 mb-3'>
                    <input
                        type="text"
                        placeholder='Enter an option...'
                        value={option}
                        onChange={({ target }) => setOption(target.value)}
                        className='w-full text-[13px] text-black outline-none bg-gray-200/80 px-3 py-[6px] rounded-md'
                    />

                    <button className='btn-small text-nowrap py-[6px]' onClick={handleAddOption}>
                        <HiMiniPlus className="text-lg" /> Add Option
                    </button>
                </div>
            )}
        </div>
    );
};
