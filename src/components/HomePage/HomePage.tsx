import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  fetchMoviesByQuery,
  fetchRandomMovies,
} from "../../redux/reducers/movies/moviesThunks";
import { RootState } from "../../redux/store";
import { useAppDispatch } from "../../redux/hooks";
import MovieItem from "./MovieItem";
import GlobalLoader from "../Common/GlobalLoader/GlobalLoader";
import classes from "./HomePage.module.css";
import { Divider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { clearMovie } from "../../redux/reducers/movies/currentMovieSlice";
const { Search } = Input;

function HomePage() {
  const dispatch = useAppDispatch();
  const { movies, loading, error } = useSelector(
    (state: RootState) => state.moviesData
  );

  useEffect(() => {
    dispatch(fetchRandomMovies());
    dispatch(clearMovie());
  }, []);

  const handleSearch = (value: string) => {
    dispatch(fetchMoviesByQuery(value));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) {
      dispatch(fetchRandomMovies());
    }
  };

  return (
    <>
      <div style={{ marginTop: 40 }}>
        <Search
          placeholder="Search Your Favorite Movies"
          style={{ width: "20%", height: 40 }}
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
          onChange={handleInputChange}
        />
      </div>
      {loading ? (
        <GlobalLoader />
      ) : error ? (
        <div>{"Error Message" + error}</div>
      ) : (
        <div>
          <Divider style={{ marginTop: 50 }} />
          <div className={classes.movieContainer}>
            {movies.map((item, index) => (
              <MovieItem key={index} movie={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
