import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function CategoryDropdown(props) {
  const { categoryList } = props;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const getOptions = () => {
    return categoryList.map((option) => {
      return <button>{option.category_name}</button>;
    });
  };

  return (
    <div>
      <div class="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-dark"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={toggleDropdown}
          >
            Categories
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 011.414 1.414l-4 4A1 1 0 0110 12z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div
            className="origin-top-right absolute z-50 h-full mt-2 w-56 rounded-md bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div
              className="relative z-50 text-sm text-dark h-10 my-1 w-full px-2 py-2"
              role="none"
            >
              {getOptions()}
            </div>
          </div>
        )}
      </div>
    </div>

    // <div className="flex gap-2">
    //   <select className="">{getOptions()}</select>
    //   <button>RESET FILTER</button>
    // </div>
  );
}

export default CategoryDropdown;
