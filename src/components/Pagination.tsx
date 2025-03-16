import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchBooks } from '../redux/booksSlice';

const Pagination: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalItems, status } = useAppSelector((state) => state.books);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [maxResults, setMaxResults] = React.useState(10);
  const query = useAppSelector((state) => state.books.query);

  const totalPages = Math.ceil(totalItems / maxResults);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchBooks({ query, startIndex: (page - 1) * maxResults, maxResults }));
  };

  const handleMaxResultsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value, 10);
    setMaxResults(value);
    setCurrentPage(1); // Reset to the first page when changing the number of results per page
    dispatch(fetchBooks({ query, startIndex: 0, maxResults: value }));
  };

  if (status === 'loading' || totalItems === 0) return null;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline"
        >
          Previous
        </button>
        <span className="flex items-center px-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline"
        >
          Next
        </button>
      </div>
      <div className="flex items-center gap-2">
      <label htmlFor="maxResults" className="whitespace-nowrap">Results per page:</label>
        <select
          id="maxResults"
          value={maxResults}
          onChange={handleMaxResultsChange}
          className="select select-bordered"
        >
          {[5, 10, 15, 20].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;