// Import Modules
import React from "react";

// Import File CSS
import "./css/pagination.css";

// Import Components
import { Pagination } from "antd";

export default function CustomPagination({ onShowItemsByPage, totalItems }) {
  // Create + use event handles
  const changePageHandle = (currentPage) => {
    onShowItemsByPage(currentPage);
  };

  return (
    <Pagination
      className="pagination-products"
      defaultCurrent={1}
      pageSize={8}
      total={totalItems}
      onChange={changePageHandle}
    />
  );
}
