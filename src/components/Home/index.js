import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

import "./home.scss";
import Movie from "../Movie";
import styles from "./styles.js";
import smallLogo from "./images/logo-small.png";
import largeLogo from "./images/logo-large.png";
import { MOVIES_ERROR } from "../../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      moviesList: [],
      selectedMovie: {},
      movieName: ""
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    const url = process.env.REACT_APP_BASE_API_URL;

    try {
      const res = await axios.get(url);
      if (res.data && res.status === 200) {
        const { results } = res.data;
        const sortedMovieList = results.sort((a, b) => {
          return new Date(a.release_date) - new Date(b.release_date);
        });
        this.setState({
          moviesList: sortedMovieList,
          loading: false
        });
      } else {
        return window.showToast(
          5,
          MOVIES_ERROR
        );
      }
    } catch (error) {
      return window.showToast(
        5,
        MOVIES_ERROR
      );
    }
  };

  handleChange = e => {
    this.setState({
      selectedMovie: e.target.value,
      movieName: e.target.value.title
    });
  };

  render() {
    const { moviesList, loading, selectedMovie, movieName } = this.state;
    const { classes } = this.props;

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
                  onChange={this.handleChange}
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
}

export default withStyles(styles)(Home);
