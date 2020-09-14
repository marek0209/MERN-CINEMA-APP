import React from "react";
import "./MovieSeanceBooking.css";
import Moment from "react-moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateSeanseAction } from "../../actions/seanseAction";

class MovieSeanceBooking extends React.Component {
  constructor() {
    super();
    this.state = {
      bookings: [],
    };
  }

  componentDidMount() {
    this.setState({ bookings: this.props.seance.bookings });
  }

  seatsClick = (e) => {
    e.persist();
    let copy = this.state.bookings;
    let atr = e.target.dataset;
    console.log(atr.col, atr.row, atr.booked);
    let value = atr.booked === "true";
    copy[atr.row][atr.col].isBooked = !value;
    this.setState({ bookings: copy });
    console.log(this.state.bookings, "click");
  };

  reserevedSeatsClick = (e) => {
    console.log("sorry... this seats is reserved");
  };

  conditionalRender = (exist, booked, row, col) => {
    return (
      <div
        className={`${exist ? "existingChair" : "notExistingChair"} ${
          booked ? "booked" : ""
        }`}
        onClick={this.seatsClick}
        data-exist={exist}
        data-booked={booked}
        data-row={row}
        data-col={col}
      ></div>
    );
  };

  onSubmit = (e) => {
    console.log(this.state);
    let id = this.props.seance._id;
    let bookings = this.state.bookings;
    let token = localStorage.getItem("jwtToken");
    let history = this.props.history;
    // console.log(id, bookings, token, "history", history);
    this.props.updateSeanseAction(id, bookings, token, history);
    // this.props.history.push("/rooms");
  };

  render() {
    return (
      <>
        {/* <h3>{this.props.messages}</h3> */}
        <h3>
          <Moment date={this.props.seance.date} format="DD-MM-YYYY" />
        </h3>
        <h3>{this.props.seance.hour}</h3>
        {this.state.bookings.map((row, rowIndex) => (
          <div key={rowIndex} className="array-row">
            {row.map((chair, chairIndex) => (
              <div key={chairIndex}>
                {this.conditionalRender(
                  chair.isExsist,
                  chair.isBooked,
                  chair.row,
                  chair.col
                )}
              </div>
            ))}
          </div>
        ))}
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
          }}
          type="submit"
          className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          onClick={this.onSubmit}
        >
          submit
        </button>
        <div className="guide">
          <div className="booked"></div>
          <h3>This chair is booked</h3>
        </div>
        <div className="guide">
          <div className="existingChair"></div>
          <h3>This chair is exists</h3>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({});

export default withRouter(
  connect(mapStateToProps, { updateSeanseAction })(MovieSeanceBooking)
);
