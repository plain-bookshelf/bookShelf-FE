import ReactPaginate from "react-paginate";
import "./PaginationBar.css";
import paginationArrow from "../../assets/paginationArrow.png"

export default function PaginationBar({ pageCount, onPageChange }: any) {
  return(
      <ReactPaginate
        previousLabel={<img src={paginationArrow} />}
        nextLabel={<img src={paginationArrow} style={{rotate: "180deg"}} />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={e => onPageChange(e.selected)}
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