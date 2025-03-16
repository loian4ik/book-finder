import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchBookDetails } from '../redux/booksSlice';

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedBook, status } = useAppSelector((state) => state.books);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookDetails(id));
    }
  }, [id, dispatch]);

  if (status === 'loading') return <p>Loading...</p>;
  if (!selectedBook) return <p>Book not found.</p>;

  const { volumeInfo } = selectedBook;

  return (
    <div className="p-4">
      <Link to="/" className="btn btn-outline mb-4">
        Back to Search
      </Link>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{volumeInfo.title}</h2>
          {volumeInfo.authors && (
            <p className="text-sm text-gray-600">By {volumeInfo.authors.join(', ')}</p>
          )}
          {volumeInfo.imageLinks?.thumbnail && (
            <img
              src={volumeInfo.imageLinks.thumbnail}
              alt={volumeInfo.title}
              className="w-48 h-auto mx-auto my-4"
            />
          )}
          <p>{volumeInfo.description}</p>
          <div className="mt-4">
            <a
              href={volumeInfo.infoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View on Google Books
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;