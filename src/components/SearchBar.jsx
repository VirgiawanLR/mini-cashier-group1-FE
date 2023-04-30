import { useState } from "react";
function SearchBar() {
  //   const fruits = [];

  const [search, setSearch] = useState("");

  //   const renderList = () => {
  //     return fruits
  //       .filter((fruit) => {
  //         return fruit.toLowerCase().includes(search.toLowerCase());
  //       })
  //       .map((fruit) => {
  //         return (
  //           <div>
  //             <p className=" text-black bg-yellow-500 rounded-lg p-5 ">{fruit}</p>
  //           </div>
  //         );
  //       });
  //   };

  const inputHandler = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <div className="flex justify-center gap-1 w-full">
        <input
          type="text"
          className="bg-white text-dark shadow-md text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 p-2.5 px-5"
          onChange={inputHandler}
          placeholder="Search..."
        />

        {/* {renderList()} */}
      </div>
    </div>
  );
}

export default SearchBar;
