import ReactPaginate from "react-paginate";
import paginationArrow from "../../assets/paginationArrow.png";
import "./PaginationBar.css";

type PaginationBarProps = {
  pageCount: number;
  onPageChange: (event: { selected: number }) => void;
};

export default function PaginationBar({ pageCount, onPageChange }: PaginationBarProps) {
  return (
    <ReactPaginate
      previousLabel={<img src={paginationArrow} alt="previous page" />}
      nextLabel={<img src={paginationArrow} alt="next page" style={{ rotate: "180deg" }} />}
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName="pagination"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakClassName="page-item"
      breakLinkClassName="page-link"
      activeClassName="active"
    />
  );
}

