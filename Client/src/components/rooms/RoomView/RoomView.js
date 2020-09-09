import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchRoomsAction } from "../../../actions/roomActions";
import {
  getRoomsError,
  getRooms,
  getRoomsPending,
} from "../../../reducers/roomReducer";

import LoadingSpinner from "../../layout/Loader";
import RoomArrayView from "./RoomArrayView";
// import RoomCreatorTest from "./RoomCreatorTest";
// import RoomList from "./RoomList";

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

  render() {
    const { rooms, error } = this.props.rooms;
    if (!this.shouldComponentRender()) return <LoadingSpinner />;

    return (
      <div className="room-list-wrapper">
        {error && <span className="room-list-error">{error}</span>}

        {rooms.map((room) => (
          <div className="row" key={room._id}>
            <div className="col s12">
              <div className="card">
                <span className="card-title">{room.roomName}</span>
                <div className="card-image">
                  <RoomArrayView arr={room.roomSeatsPlan} />
                </div>
                <div className="card-content">
                  <p>{room.roomDescription}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
