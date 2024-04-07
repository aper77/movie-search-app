import React, { useState } from "react";
import { Movie } from "../../redux/reducers/movies/types";
import classes from "./HomePage.module.css";
import GlobalLoader from "../Common/GlobalLoader/GlobalLoader";
import { Tooltip } from "antd";
import { useHistory } from "react-router-dom";

interface MovieItemProps {
  movie: Movie;
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const history = useHistory();

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const handleClick = () => {
    history.push(`/movie/${movie["#IMDB_ID"]}`);
  };

  return (
    <Tooltip title={movie["#AKA"]}>
      <div onClick={handleClick} className={classes.container}>
        <div className={classes.imgContainer}>
          {!imageLoaded && <GlobalLoader />}
          <img
            className={`${classes?.movieImg}`}
            src={movie["#IMG_POSTER"]?.toString()}
            alt={movie.IMG_POSTER}
            onLoad={handleImageLoaded}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
        <p>{movie["#TITLE"]}</p>
      </div>
    </Tooltip>
  );
};

export default MovieItem;
