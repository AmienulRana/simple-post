import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

interface PaginationType {
  data: any;
  itemsPerPage: number;
  setCurrentItems: React.Dispatch<React.SetStateAction<any>>;
}
export default function Pagination(props: PaginationType) {
  const { itemsPerPage, setCurrentItems, data } = props;
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="prev"
      renderOnZeroPageCount={() => {}}
      containerClassName="flex w-full justify-center text-gray-500 items-center my-16 flex-wrap"
      activeClassName="border-2 border-orange-500 text-orange-500"
      pageClassName="text-center py-1 px-4 rounded-lg mx-2 font-bold"
    />
  );
}
