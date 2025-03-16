import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import Pagination from './components/Pagination';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow p-4">
          <SearchBar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BookList />
                  <Pagination />
                </>
              }
            />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
