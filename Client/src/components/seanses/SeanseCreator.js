import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createSeansesAction } from "../../actions/seanseAction";
import { getSeansesError, getMessages } from "../../reducers/seanseReducer";
import DatePicker from "./DatePicker";
import MovieSelector from "./MovieSelector";
import RoomSelector from "./RoomSelector";
class SeanseCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      date: undefined,
      hour: "",
      movie: undefined,
      room: "",
      bookings: [],
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    let newSeanse = {
      date: this.state.date,
      hour: this.state.hour,
      movie: this.state.movie,
      bookings: this.state.bookings,
    };
    let token = localStorage.getItem("jwtToken");
    let history = this.props.history;
    this.props.createSeanses(newSeanse, token, history);
  };

  getDate = (data) => {
    this.setState({ date: data });
  };

  getMovieId = (id) => {
    this.setState({ movie: id });
  };

  getRoomId = (room) => {
    console.log(room.roomSeatsPlan);
    let newBookingPlan = room.roomSeatsPlan;
    this.setState({ bookings: newBookingPlan });
    console.log(this.state.bookings);
  };

  render() {
    return (
      <>
        <h1>Let's create new seanse</h1>

        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col s3"></div>
            <div className="col s3">
              Movie
              <MovieSelector getMovieId={this.getMovieId} />
            </div>

            <div className="col s3">
              Date
              <br></br>
              <DatePicker getDate={this.getDate} />
            </div>
            <div className="col s3"></div>
          </div>

          <div className="row">
            <div className="col s3"></div>
            <div className="col s3">
              Hour
              <input
                onChange={this.onChange}
                id="hour"
                type="text"
                className="input-field inline"
              />
            </div>
            <div className="col s3">
              Room
              <RoomSelector getRoomId={this.getRoomId} />
            </div>
            <div className="col s3"></div>
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
  error: getSeansesError(state),
  messages: getMessages(state),
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createSeanses: createSeansesAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SeanseCreator);
