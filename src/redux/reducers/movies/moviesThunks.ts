import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Movie } from "./types";
import { log } from "console";
import { RootState } from "../../store";

export const fetchRandomMovies = createAsyncThunk<Movie[]>(
  "movies/fetchRandomMovies",
  async () => {
    try {
      let movies: Movie[] = [];
      while (movies.length < 10) {
        const randomChar = String.fromCharCode(
          97 + Math.floor(Math.random() * 26)
        );
        const response = await axios.get(
          `https://search.imdbot.workers.dev/?q=${randomChar}`
        );
        const allMovies = response.data.description;
        movies = movies.concat(allMovies.slice(0, 10 - movies.length));
      }
      return movies;
    } catch (error) {
      throw new Error("Failed to fetch random movies");
    }
  }
);

export const fetchMoviesByQuery = createAsyncThunk<Movie[], string>(
  "movies/fetchMoviesByQuery",
  async (query: string) => {
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?q=${query}`
      );
      const movies = response.data.description;
      return movies;
    } catch (error) {
      throw new Error("Failed to fetch movies by query");
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (IMDB_ID: string) => {
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?q=${IMDB_ID}`
      );
      const movie = response.data.description[0];
      return movie;
    } catch (error) {
      throw new Error("Failed to fetch movie by ID");
    }
  }
);

export const fetchMoviesByTitle = createAsyncThunk(
  "movies/fetchMoviesByTitle",
  async ({ title, IMDB_ID }: { title: string; IMDB_ID: string }) => {
    try {
      const response = await axios.get(
        `https://search.imdbot.workers.dev/?q=${title}`
      );
      const movies = response.data.description;
      const filteredMovies = movies.filter(
        (movie: Movie) => movie["#IMDB_ID"] !== IMDB_ID
      );

      return filteredMovies;
    } catch (error) {
      throw new Error("Failed to fetch movies by title");
    }
  }
);
