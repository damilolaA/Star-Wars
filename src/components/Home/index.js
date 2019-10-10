import React, { useState, useEffect, useContext, useRef } from "react";
import Select from 'react-select';

import "./home.scss";
import Movie from "../Movie";
import logo from "./images/logo.png";
import { MOVIES_ERROR } from "../../utils/constants";
import { ToastContext } from "../../providers/toast.provider";

const fetchMovies = async (setMoviesState, toastData) => {
  const url = process.env.REACT_APP_BASE_API_URL;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.status === 200) {
      const { results } = data;
      const sortedMovieList = results.sort((a, b) => {
        return new Date(a.release_date) - new Date(b.release_date);
      }).map(item => {
        return({
          value: item,
          label: item.title
        })
      });

      setMoviesState({
        moviesList: sortedMovieList,
        loading: false
      });
    } else {
      return toastData.current.showToast(5, MOVIES_ERROR);
    }
  } catch (error) {
    return toastData.current.showToast(5, MOVIES_ERROR);
  }
};

function Home() {
  const [moviesState, setMoviesState] = useState({
    loading: true,
    moviesList: []
  });

  const [movieName, setMovieName] = useState("");

  const [selectedMovie, setSelectedMovie] = useState({});

  const toastData = useRef(useContext(ToastContext));

  useEffect(() => {
    fetchMovies(setMoviesState, toastData);
  }, []);

  const handleChange = selectedOption => {
    setMovieName(selectedOption.value.title);
    setSelectedMovie(selectedOption.value);
  };

  const { loading, moviesList } = moviesState;

  return (
    <div className="container">
      <nav className="container__navigation">
        <div>
          <p>Star Wars Movies</p>
        </div>
      </nav>
      <section className="container__header">
        <div className="container__header__dropdown">
          <img src={logo} alt="" />
          <h1>The Starwars Movie Library </h1>
          <p>
            This is a modest collection of Starwars titles and relative
            information
          </p>
          <form>
            <Select 
              className="form-control"
              onChange={selectedOption => handleChange(selectedOption)}
              placeholder= {movieName !== "" ? movieName : "Select Movie"}
              options={moviesList}
              isLoading={loading}
              autoFocus={true}
            />
          </form>
        </div>
        <div className="container__main">
          {selectedMovie.opening_crawl ? (
            <Movie key={selectedMovie.release_date} movie={selectedMovie} />
          ) : (
            <div>{
              <img src={logo} alt="" />
            }</div>
          )}
        </div>
      </section>
      <div className="container__footer">
        <p>“Remember…the Force will be with you, always.” — Obi Wan Kenobi</p>
      </div>
    </div>
  );
}

export default Home;
