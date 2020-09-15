import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMoviesAction } from "../../actions/movieActions";
import { withRouter } from "react-router-dom";
import {
  getMoviesError,
  getMovies,
  getMoviesPending,
} from "../../reducers/movieReducer";

import LoadingSpinner from "../layout/Loader";
import "./MovieViewStyle.css";

class MovieView extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  shouldComponentRender() {
    if (this.props.movies.pending === false) return true;
    return false;
  }

  goToSeance = (e) => {
    let id = e.target.dataset.movieid;
    this.props.history.push({
      pathname: "/movie-seance",
      state: { id: id },
    });
  };
  render() {
    const { movies, error } = this.props.movies;
    if (!this.shouldComponentRender()) return <LoadingSpinner />;
    return (
      <div className="movie-list-wrapper">
        {error && <span className="movie-list-error">{error}</span>}

        {movies.map((movie) => (
          <div className="movie-box" key={movie._id}>
            <h4>{movie.title}</h4>
            <div className="card-image">
              <img src={movie.movieImgUrl} alt="" />
            </div>
            <div className="card-content">
              <p>{movie.movieDescription}</p>
            </div>
            <div className="seances">
              <button onClick={this.goToSeance} data-movieid={movie._id}>
                Seances
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getMoviesError(state),
  movies: getMovies(state),
  pending: getMoviesPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchMovies: fetchMoviesAction,
    },
    dispatch
  );

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieView)
);
