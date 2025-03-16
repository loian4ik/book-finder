import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Link } from 'react-router-dom';

const BookList: React.FC = () => {
  const { items, status } = useSelector((state: RootState) => state.books);

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error fetching books.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.map((book) => (
        <div key={book.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{book.volumeInfo.title}</h2>
            <p className="line-clamp-2">{book.volumeInfo.description}</p>
            <Link to={`/book/${book.id}`} className="btn btn-primary">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList; 