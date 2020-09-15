import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createRoomsAction } from "../../../actions/roomActions";
import { getRoomsError, getMessages } from "../../../reducers/roomReducer";
import "./StepTwo.css";

class StepTwo extends React.Component {
  constructor() {
    super();
    this.state = {
      layout: [],
    };
  }

  componentDidMount() {
    const arr = this.props.data.roomLayout;
    this.setState({ layout: arr });
  }

  seatsClick = (e) => {
    e.preventDefault();
    e.persist();
    let copy = this.state.layout;
    let atr = e.target.dataset;
    console.log(atr.col);
    copy[atr.row][atr.col].isExsist = !atr.exist;
    this.setState({ layout: copy });
    console.log(this.state);
  };

  conditionalRender = (value, row, col) => {
    if (value) {
      return (
        <div
          className="existingChair"
          onClick={this.seatsClick}
          data-exist={value}
          data-row={row}
          data-col={col}
        ></div>
      );
    } else {
      return (
        <div
          className="notExistingChair"
          onClick={this.seatsClick}
          data-exists={value}
          data-row={row}
          data-col={col}
        ></div>
      );
    }
  };

  onSubmit = (e) => {
    console.log(this.state);
    let newRoom = {
      roomName: this.props.data.roomName,
      roomDescription: this.props.data.roomDescription,
      roomSeatsPlan: this.state.layout,
    };
    let token = localStorage.getItem("jwtToken");
    let history = this.props.history;
    this.props.createRooms(newRoom, token, history);
    // this.props.history.push("/rooms");
  };

  render() {
    //action when user click on pre-renderd layout
    const roomSeatsPlan = this.props.data.roomLayout;
    console.log(this.props);

    return (
      <>
        {/* <h3>{this.props.messages}</h3> */}
        <h3>Room Name:{this.props.data.roomName}</h3>
        <h3>Room Description:{this.props.data.roomDescription}</h3>
        {roomSeatsPlan.map((row, rowIndex) => (
          <div key={rowIndex} className="array-row">
            {row.map((chair, chairIndex) => (
              <div key={chairIndex}>
                {this.conditionalRender(chair.isExsist, chair.row, chair.col)}
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
          <div className="NotExistingChair"></div>
          <h3>This chair is not exists</h3>
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
  error: getRoomsError(state),
  messages: getMessages(state),
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createRooms: createRoomsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
