import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    infoLink: string;
  };
}

interface BooksState {
  items: Book[];
  selectedBook: Book | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  totalItems: number;
  query: string;
}

const initialState: BooksState = {
  items: [],
  selectedBook: null,
  status: 'idle',
  error: null,
  totalItems: 0,
  query: '',
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async ({ query, startIndex, maxResults }: { query: string; startIndex: number; maxResults: number }) => {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    return response.data;
  }
);

export const fetchBookDetails = createAsyncThunk(
  'books/fetchBookDetails',
  async (id: string) => {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    return response.data;
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items || [];
        state.totalItems = action.payload.totalItems || 0;
        state.query = action.meta.arg.query;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch books';
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch book details';
      });
  },
});

export default booksSlice.reducer;