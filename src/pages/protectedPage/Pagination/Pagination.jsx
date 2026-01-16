import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="pagination-wrapper my-3">
      {/* Previous Button */}
      <button
        className="nav-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        « Previous
      </button>

      {/* Middle pill */}
      <div className="pages-box">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`page-number ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="nav-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next »
      </button>
    </div>
  );
};

export default Pagination;
