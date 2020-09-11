import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createMoviesAction } from "../../actions/movieActions";
import { getMoviesError, getMessages } from "../../reducers/movieReducer";
class MovieCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      movieDescription: "",
      movieImgUrl: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let newMovie = {
      title: this.state.title,
      movieDescription: this.state.movieDescription,
      movieImgUrl: this.state.movieImgUrl,
    };
    let token = localStorage.getItem("jwtToken");
    let history = this.props.history;
    console.log(this.props);
    this.props.createMovies(newMovie, token, history);
  };

  getDate = (data) => {
    console.log(data);
  };

  render() {
    return (
      <>
        <h1>Let's create new movie</h1>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col s3"></div>
            <div className="col s3">
              Title
              <input
                onChange={this.onChange}
                id="title"
                type="text"
                className="input-field inline"
              />
            </div>

            <div className="col s3">
              Movie description
              <input
                onChange={this.onChange}
                id="movieDescription"
                type="text"
                className="input-field inline"
              />
            </div>
            <div className="col s3"></div>
          </div>

          <div className="row">
            <div className="col s3"></div>
            <div className="col s3">
              Movie image url
              <input
                onChange={this.onChange}
                id="movieImgUrl"
                type="text"
                className="input-field inline"
              />
            </div>
          </div>

          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
            }}
            type="submit"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
            Create
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getMoviesError(state),
  messages: getMessages(state),
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createMovies: createMoviesAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MovieCreator);
