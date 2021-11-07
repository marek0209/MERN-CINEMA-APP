import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchRoomsAction } from "../../actions/roomActions";
import {
  getRoomsError,
  getRooms,
  getRoomsPending,
} from "../../reducers/roomReducer";

import LoadingSpinner from "../layout/Loader";
import "./MovieSelector.css";

class RoomView extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    const { fetchRooms } = this.props;
    fetchRooms();
  }

  shouldComponentRender() {
    if (this.props.rooms.pending === false) return true;
    return false;
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log("Selector", e.target.value);
    let { rooms } = this.props.rooms;
    let myItemId = e.target.value;
    let myRoom = rooms.find((room) => room._id === myItemId);
    this.props.getRoomId(myRoom);
  };

  render() {
    const { rooms, error } = this.props.rooms;
    if (!this.shouldComponentRender()) return <LoadingSpinner />;

    return (
      <>
        <div>{error}</div>
        <select className="select-css" id="room" onChange={this.handleChange}>
          {[{ _id: 0, roomName: "Select room" }, ...rooms].map((room) => (
            <option key={room._id} value={room._id}>
              {room.roomName}
            </option>
          ))}
        </select>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getRoomsError(state),
  rooms: getRooms(state),
  pending: getRoomsPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchRooms: fetchRoomsAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RoomView);
