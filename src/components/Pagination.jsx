import { nextPage, prevPage } from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";

function Pagination() {

  const dispatch = useDispatch();
  const selectProductList = useSelector((state) => state.product.selectProductList); 
  const pageData = useSelector((state) => state.product.pageData); 

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
  );
}

export default Pagination;
