import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRandomMovies,
  fetchMoviesByQuery,
  fetchMovieById,
} from "./moviesThunks";
import { Movie } from "./types";

interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  selectedMovie: Movie | null;
}

const initialState: MoviesState = {
  movies: [],
  loading: false,
  error: null,
  selectedMovie: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRandomMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.movies = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchRandomMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch random movies";
      })
      .addCase(fetchMoviesByQuery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMoviesByQuery.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.movies = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(fetchMoviesByQuery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch movies by query";
      });
  },
});

export default moviesSlice.reducer;
