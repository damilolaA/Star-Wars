import React, { useState, useEffect, useContext, useRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import "./home.scss";
import Movie from "../Movie";
import styles from "./styles.js";
import smallLogo from "./images/logo-small.png";
import largeLogo from "./images/logo-large.png";
import { MOVIES_ERROR } from "../../utils/constants";
import { ToastContext } from '../../providers/toast.provider';


const fetchMovies = async (setMoviesState, toastData) => {
  const url = process.env.REACT_APP_BASE_API_URL;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status === 200) {
      const { results } = data;
      const sortedMovieList = results.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date);
      });
      setMoviesState({
        moviesList: sortedMovieList,
        loading: false,
      });
    } else {
      return toastData.current.showToast(
        5,
        MOVIES_ERROR
      );
    }
  } catch (error) {
    return toastData.current.showToast(
      5,
      MOVIES_ERROR
    );
  }
};  

function HomeComponent(props) {
  const [moviesState, setMoviesState] = useState({
    loading: false,
    moviesList: []
  });

  const [movieName, setMovieName] = useState("")

  const [selectedMovie, setSelectedMovie] = useState({})

  const toastData = useRef(useContext(ToastContext));

  useEffect(() => {
    fetchMovies(setMoviesState, toastData);
  }, []);

  const handleChange = (e) => {
    setMovieName(e.target.value.title);
    setSelectedMovie(e.target.value);
  };

  const { classes } = props;
  const { loading, moviesList } = moviesState;

  return (
    <div className="container">
      <nav className="container__navigation">
        <div>
          <img src={smallLogo} alt="" />
        </div>
        <div>
          <p>Star Wars Movies</p>
        </div>
      </nav>
      <header className="container__header">
        <section className="container__header__dropdown">
          <h1>Please Select A Movie</h1>
          <FormControl>
            <form>
              <Select
                className={classes.select}
                value={loading ? "loading..." : movieName}
                renderValue={() => loading ? "loading..." : movieName}
                onChange={e => handleChange(e)}
                disabled={loading}
                inputProps={{
                  name: "movieName",
                  id: "movies"
                }}
              >
                {moviesList.length > 0 &&
                  moviesList.map(movie => (
                    <MenuItem key={movie.release_date} value={movie}>
                      {movie.title}
                    </MenuItem>
                  ))}
              </Select>
            </form>
          </FormControl>
        </section>
        <div className="container__header__banner-curve">
          <svg
            viewBox="0 0 1440 24"
            fill="none"
            xmlns="http:www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M0 24H1440V0C722.5 52 0 0 0 0V24Z" fill="#fff" />
          </svg>
        </div>
      </header>
      <section className="container__main">
        {selectedMovie.opening_crawl ? (
          <Movie key={selectedMovie.release_date} movie={selectedMovie} />
        ) : (
          <div>
            <img src={largeLogo} alt="" />
          </div>
        )}
      </section>
    </div>
  ); 
}

export default withStyles(styles)(HomeComponent);
