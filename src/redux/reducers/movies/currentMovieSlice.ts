import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "./types";
import { fetchMovieById, fetchMoviesByTitle } from "./moviesThunks";

interface MovieState {
  currentMovie: Movie | null;
  similarMovies: Movie[];
  loading: boolean;
  error: string | null;
}

const initialState: MovieState = {
  currentMovie: null,
  similarMovies: [],
  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    clearMovie(state) {
      state.currentMovie = null;
      state.similarMovies = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch movie";
      })
      .addCase(fetchMoviesByTitle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByTitle.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload;
        state.error = null;
      })
      .addCase(fetchMoviesByTitle.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to fetch movies by actors";
      });
  },
});

export const { clearMovie } = movieSlice.actions;

export default movieSlice.reducer;
