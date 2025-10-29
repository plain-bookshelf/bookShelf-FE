import { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ManagementContext } from "../contexts/ManagementContext";
import "./PaginationBar.css";

export default function PaginationBar() {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(5); //처음 페이지 렌더링 할 때 총 데이터 개수나 페이지 개수 받아야 함
  const {setManageData} = useContext(ManagementContext); //어제 데이터 렌더링은 페이지에서 map 돌릴 거니까 정보 받아와서 ContextApi로 수정만 해주면 될듯?
  
  const fetchItem = async (page: number) => {
    /*서버랑 통신해서 아이템 가져와야 함*/
  }

  useEffect(() => {
    fetchItem(currentPage);
  }, [currentPage]);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected)
  }

  return(
      <ReactPaginate
        previousLabel={"‹"}
        nextLabel={"›"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />

  )
}