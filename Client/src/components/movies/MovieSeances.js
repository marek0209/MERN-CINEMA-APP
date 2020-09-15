import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMovieSeancesAction } from "../../actions/movieSeancesActions";
import Moment from "react-moment";
import MovieSeanceBooking from "./MovieSeanceBooking";
import LoadingSpinner from "../layout/Loader";
import "./MovieViewStyle.css";

class MovieSeances extends Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false };

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchMovieSeancesAction } = this.props;
    let id = this.props.location.state.id;
    fetchMovieSeancesAction(id);
  }

  shouldComponentRender() {
    if (this.props.isLoading === false) return true;
    return false;
  }
  handleClick = (seance) => {
    this.setState({ seance: seance });
    this.setState({ isClicked: true });
  };

  render() {
    let seances = this.props.seances;

    if (!this.shouldComponentRender()) return <LoadingSpinner />;
    if (!this.state.isClicked)
      return (
        <>
          {seances.map((seance) => (
            <div key={seance.date}>
              <Moment format="DD-MM-YYYY" date={seance.date} />
              <br></br>
              {seance.hour}
              <br></br>
              <button
                data-seanseid={seance._id}
                onClick={() => {
                  this.handleClick(seance);
                }}
              >
                Book seats
              </button>
            </div>
          ))}
        </>
      );
    return (
      <>
        <MovieSeanceBooking seance={this.state.seance} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.movieSeances.isLoading,
  seances: state.movieSeances.seances,
  error: state.movieSeances.error,
});

export default connect(mapStateToProps, { fetchMovieSeancesAction })(
  MovieSeances
);
