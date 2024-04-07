import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import classes from "./CurrentMoviePage.module.css";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  fetchMovieById,
  fetchMoviesByTitle,
} from "../../redux/reducers/movies/moviesThunks";
import GlobalLoader from "../Common/GlobalLoader/GlobalLoader";
import { Button, Card, Tooltip } from "antd";

interface Params {
  IMDB_ID: string;
}

function CurrentMoviePage() {
  const { IMDB_ID } = useParams<Params>();
  const dispatch = useAppDispatch();
  const { currentMovie, loading, error, similarMovies } = useSelector(
    (state: RootState) => state.currentMovie
  );
  const history = useHistory();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    dispatch(fetchMovieById(IMDB_ID));
  }, [IMDB_ID]);

  useEffect(() => {
    if (currentMovie) {
      dispatch(
        fetchMoviesByTitle({
          title: currentMovie["#TITLE"].toString(),
          IMDB_ID,
        })
      );
    }
  }, [currentMovie]);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const handleClick = () => {
    history.push("/");
  };

  const handleClickBByCurrent = (id: any) => {
    history.replace(`/movie/${id}`);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <div className={classes.container}>
      {loading ? (
        <GlobalLoader />
      ) : error ? (
        <div>{"Error Message" + error}</div>
      ) : (
        currentMovie && (
          <>
            <div className={classes.header} />
            <div className={classes.divider} />
            <div className={classes.infoContainer}>
              <div className={classes.leftSide}>
                <h1>{currentMovie["#AKA"]}</h1>
                <img
                  src={currentMovie["#IMG_POSTER"]?.toString()}
                  alt={currentMovie["#TITLE"]?.toString()}
                />
              </div>
              <div className={classes.rightSide}>
                <ul>
                  <li>
                    <div className={classes.liTitles}>Title:</div>
                    <div className={classes.liValues}>
                      {currentMovie["#TITLE"]}
                    </div>
                  </li>
                  <li>
                    <div className={classes.liTitles}>Year:</div>
                    <div className={classes.liValues}>
                      {currentMovie["#YEAR"]}
                    </div>
                  </li>
                  <li>
                    <div className={classes.liTitles}>Actors:</div>
                    <div className={classes.liValues}>
                      {currentMovie["#ACTORS"]}
                    </div>
                  </li>
                  <li>
                    <div className={classes.liTitles}>Src:</div>
                    <div className={classes.liValues}>
                      <Link
                        onClick={() =>
                          openInNewTab(currentMovie["#IMDB_URL"].toString())
                        }
                        to="#"
                      >
                        Link for movie
                      </Link>
                    </div>
                  </li>
                </ul>
                <h4 style={{ marginLeft: "25%", marginTop: 50 }}>
                  Movies similar to your choice
                </h4>
                <div className={classes.similarMoviesContainer}>
                  {similarMovies?.map((item, index) => {
                    return (
                      <Tooltip title={item["#AKA"]}>
                        <Card
                          onClick={() =>
                            handleClickBByCurrent(item["#IMDB_ID"])
                          }
                          key={index}
                          title={`${item["#TITLE"]}`}
                          className={classes.card}
                        >
                          <div className={classes.imgContainer}>
                            {!imageLoaded && <GlobalLoader />}
                            <img
                              className={`${classes?.movieImg}`}
                              src={item["#IMG_POSTER"]?.toString()}
                              alt={item.IMG_POSTER}
                              onLoad={handleImageLoaded}
                              style={{
                                display: imageLoaded ? "block" : "none",
                              }}
                            />
                          </div>
                        </Card>
                      </Tooltip>
                    );
                  })}
                </div>
                <Button
                  style={{ marginTop: 20, width: "90%" }}
                  onClick={handleClick}
                >
                  Go To All Movies
                </Button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default CurrentMoviePage;
