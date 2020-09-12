import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchSeansesAction } from "../../actions/seanseAction";
import {
  getSeansesError,
  getSeanses,
  getSeansesPending,
} from "../../reducers/seanseReducer";

import LoadingSpinner from "../layout/Loader";
import RoomArrayView from "./RoomArrayView";

class SeanseView extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentDidMount() {
    this.props.fetchSeanses();
  }

  shouldComponentRender() {
    if (this.props.seanses.pending === false) return true;
    return false;
  }

  render() {
    const { seanses, error } = this.props.seanses;
    if (!this.shouldComponentRender()) return <LoadingSpinner />;

    return (
      <div className="seanse-list-wrapper">
        {error && <span className="seanse-list-error">{error}</span>}

        {seanses.map((seanse) => (
          <div className="seanse-box" key={seanse._id}>
            <h4>{seanse.date}</h4>
            <div className="card-content">
              <h5>{seanse.hour}</h5>
              <p>{seanse.movie}</p>
              <RoomArrayView arr={seanse.bookings} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: getSeansesError(state),
  seanses: getSeanses(state),
  pending: getSeansesPending(state),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchSeanses: fetchSeansesAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(SeanseView);
