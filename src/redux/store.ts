import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movies/moviesSlice";
import currentMovieReducer from "./reducers/movies/currentMovieSlice";

const rootReducer = combineReducers({
  moviesData: moviesReducer,
  currentMovie: currentMovieReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
