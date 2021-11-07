import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchMoviesAction } from "../../actions/movieActions";
import {
  getMoviesError,
  getMovies,
  getMoviesPending,
} from "../../reducers/movieReducer";

import LoadingSpinner from "../layout/Loader";
import "./MovieSelector.css";

class MovieSelector extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchMovies } = this.props;
    fetchMovies();
  }

  shouldComponentRender() {
    if (this.props.movies.pending === true) return false;
    return true;
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    this.props.getMovieId(e.target.value);
  };

  render() {
    const { movies, error } = this.props.movies;
    if (!this.shouldComponentRender()) return <LoadingSpinner />;

    return (
      <>
        <div>{error}</div>
        <select
          className="select-css"
          id="exampleFormControlSelect1"
          onChange={this.handleChange}
        >
          {[{ _id: 0, title: "Select title" }, ...movies].map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieSelector);
