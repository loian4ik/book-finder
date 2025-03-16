import React, { useState } from 'react';
import { useAppDispatch } from '../redux/store';
import { fetchBooks } from '../redux/booksSlice';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(fetchBooks({ query: value, startIndex: 0, maxResults: 10 }));
  };

  return (
    
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for books..."
        className='w-full pr-40 bg-gray-200 input input-lg text-black'
      />
    </div>
  );
};

export default SearchBar;