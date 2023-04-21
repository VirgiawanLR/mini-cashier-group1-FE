import React, { useState } from 'react';

function Pagination({ totalItems, onPageChange, itemsPerPageOptions = [10, 25, 9] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    handlePageChange(1);
  };

  const paginationItems = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(i)}>
          {i}
        </button>
      </li>
    );
  }

  const itemsPerPageOptionsElements = itemsPerPageOptions.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <div>
          <button
            className="page-link"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        

        {paginationItems}
    
    
          <button
            className="page-link"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>


      <div className="form-group">
        <label htmlFor="itemsPerPageSelect">Items per page:</label>
        <select
          id="itemsPerPageSelect"
          className="form-control"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
        >
          {itemsPerPageOptionsElements}
        </select>
      </div>
  </div>
  );
}

export default Pagination;
