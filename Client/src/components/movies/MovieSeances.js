import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovieSeancesAction } from "../../actions/movieSeancesActions";
import PropTypes from "prop-types";
import Moment from "react-moment";

import LoadingSpinner from "../layout/Loader";
import "./MovieViewStyle.css";

class MovieSeances extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    console.log(this.props, "did");
    const { fetchMovieSeancesAction } = this.props;
    let id = this.props.location.state.id;
    fetchMovieSeancesAction(id);
  }

  shouldComponentRender() {
    if (this.props.isLoading === false) return true;
    return false;
  }

  render() {
    console.log(this.props.seances, "render");
    let seances = this.props.seances;

    if (!this.shouldComponentRender()) return <LoadingSpinner />;
    return (
      <>
        {seances.map((seance) => (
          <div key={seance.date}>
            <Moment format="DD-MM-YYYY" date={seance.date} />
            <br></br>
            {seance.hour}
            <br></br>
            <button data-seanseId={seance._id}>Book seats</button>
          </div>
        ))}
      </>
    );
  }
}
MovieSeances.propTypes = {
  fetchMovieSeancesAction: PropTypes.func.isRequired,
  seances: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.movieSeances.isLoading,
  seances: state.movieSeances.seances,
  error: state.movieSeances.error,
});

export default connect(mapStateToProps, { fetchMovieSeancesAction })(
  MovieSeances
);
