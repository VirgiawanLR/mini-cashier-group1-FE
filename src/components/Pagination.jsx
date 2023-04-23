import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { nextPage, prevPage } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

function Pagination() {

  const dispatch = useDispatch();
  const selectProductList = useSelector((state) => state.product.selectProductList); 
  const pageData = useSelector((state) => state.product.pageData); 

  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // useEffect

  // useEffect(() => {
  //   setOffset(itemsPerPage * currentPage);
  // }, [currentPage]);

  // useEffect(() => {
  //   fetchPokemons();
  // }, [offset]);

  // { totalItems, onPageChange, itemsPerPageOptions = [10, 25, 50] }

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  //   onPageChange(pageNumber);
  // };

  // const handleItemsPerPageChange = (event) => {
  //   const newItemsPerPage = parseInt(event.target.value);
  //   setItemsPerPage(newItemsPerPage);
  //   handlePageChange(1);
  // };

  // const paginationItems = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   paginationItems.push(
  //     <li key={i} className={`mx-1 ${currentPage === i ? 'text-blue-700 font-bold' : 'text-gray-500'}`}>
  //       <button className="px-2 py-1 rounded-lg hover:text-blue-700 focus:outline-none" onClick={() => handlePageChange(i)}>
  //         {i}
  //       </button>
  //     </li>
  //   );
  // }

  // const itemsPerPageOptionsElements = itemsPerPageOptions.map((option) => (
  //   <option key={option} value={option}>
  //     {option}
  //   </option>
  // ));

  return (
    <div>
      <div className="flex flex-row justify-center items-center gap-2 p-2 h-full w-full bg-amber-400">
        <button
          className={`px-2 py-1 rounded-lg focus:outline-none ${
            pageData.currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-600 hover:text-blue-700"
          }`}
          disabled={pageData.currentPage === 1}
          onClick={() => { dispatch(prevPage()) }}
        >
          PREV
        </button>
        <p className="flex content-center">
          Page {pageData.currentPage} - Showing {selectProductList.length} out of {pageData.totalCount}
        </p>
        <button
          className={`px-2 py-1 bg-white rounded-lg focus:outline-none ${
            pageData.currentPage === pageData.maxPage
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-600 hover:text-blue-700"
          }`}
          disabled={pageData.currentPage === pageData.maxPage}
          onClick={() => { dispatch(nextPage()) }}
        >
          NEXT
        </button>
      </div>
    </div>
    // <nav className="flex flex-col items-center my-4">
    //   <ul className="flex">
    //     <li className="mr-2">
    //       <button
    //         className={`px-2 py-1 rounded-lg focus:outline-none ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-600 hover:text-blue-700'}`}
    //         disabled={currentPage === 1}
    //         onClick={() => handlePageChange(currentPage - 1)}
    //       >
    //         Previous
    //       </button>
    //     </li>
    //     {paginationItems}
    //     <li className="ml-2">
    //       <button
    //         className={`px-2 py-1 rounded-lg focus:outline-none ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-600 hover:text-blue-700'}`}
    //         disabled={currentPage === totalPages}
    //         onClick={() => handlePageChange(currentPage + 1)}
    //       >
    //         Next
    //       </button>
    //     </li>
    //   </ul>
    //   <div className="mt-4">
    //     <label htmlFor="itemsPerPageSelect" className="text-gray-600 mr-2">
    //       Items per page:
    //     </label>
    //     <select
    //       id="itemsPerPageSelect"
    //       className="px-2 py-1 rounded-lg border border-gray-400 focus:outline-none"
    //       value={itemsPerPage}
    //       onChange={handleItemsPerPageChange}
    //     >
    //       {itemsPerPageOptionsElements}
    //     </select>
    //   </div>
    // </nav>
  );
}

export default Pagination;
