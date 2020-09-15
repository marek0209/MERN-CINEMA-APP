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
    let value = atr.booked === "true";
    if (value === true) {
      if (copy[atr.row][atr.col].isBookedBy !== this.props.auth.user.email) {
        this.setState({ errors: "this seat was resereved by another user" });
      } else {
        this.setState({ errors: "" });
        copy[atr.row][atr.col].isBookedBy = "";
        copy[atr.row][atr.col].isBooked = !value;
        this.setState({ bookings: copy });
      }
    } else {
      this.setState({ errors: "" });
      copy[atr.row][atr.col].isBookedBy = this.props.auth.user.email;
      copy[atr.row][atr.col].isBooked = !value;
      this.setState({ bookings: copy });
    }
  };

  conditionalRender = (exist, booked, row, col) => {
    return (
      <div
        className={`${exist ? "existingChair" : "notExistingChair"} ${
          booked ? "booked" : ""
        }`}
        onClick={exist ? this.seatsClick : undefined}
        data-exist={exist}
        data-booked={booked}
        data-row={row}
        data-col={col}
      ></div>
    );
  };

  onSubmit = (e) => {
    let id = this.props.seance._id;
    let bookings = this.state.bookings;
    let token = localStorage.getItem("jwtToken");
    let history = this.props.history;
    this.props.updateSeanseAction(id, bookings, token, history);
  };

  render() {
    return (
      <>
        <h3>
          <Moment date={this.props.seance.date} format="DD-MM-YYYY" />
        </h3>
        <h3>{this.props.seance.hour}</h3>
        <h3>{this.state.errors}</h3>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(
  connect(mapStateToProps, { updateSeanseAction })(MovieSeanceBooking)
);
