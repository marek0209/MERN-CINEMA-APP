import React from "react";
import StepTwo from "./StepTwo";

class RoomCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: 0,
      rows: 0,
      roomLayout: [],
      isSubmited: false,
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const self = this;
    let columns = this.state.columns;
    let rows = this.state.rows;
    let room = [];

    function createLayout() {
      for (let i = 0; i < rows; i++) {
        room.push([]);
        room[i].push(new Array(columns));
        for (let j = 0; j < columns; j++) {
          room[i][j] = { isExsist: true, isBooked: false, row: i, col: j };
        }
      }
    }
    // async function test() {
    //   await createLayout();
    //   console.log(room, "from async");
    //   self.setState({ roomLayout: room });
    //   console.log(self.state);
    //   self.setState({ isSubmited: true });
    // }
    // test();
    let sendLayout = Promise.resolve(createLayout());
    sendLayout.then(self.setState({ roomLayout: room }));
    self.setState({ isSubmited: true });
  };

  render() {
    if (this.state.isSubmited) {
      return (
        <>
          <h1>This is your generated layout</h1>
          <StepTwo data={this.state} history={this.props.history} />
        </>
      );
    } else {
      return (
        <>
          <h1>Let's create new room</h1>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col s3"></div>
              <div className="col s3">
                Rows
                <input
                  onChange={this.onChange}
                  value={this.state.rows}
                  id="rows"
                  type="number"
                  pattern="[0-9]"
                  className="input-field inline"
                />
              </div>

              <div className="col s3">
                Columns:
                <input
                  onChange={this.onChange}
                  value={this.state.columns}
                  id="columns"
                  type="number"
                  pattern="[0-9]"
                  className="input-field inline"
                />
              </div>
              <div className="col s3"></div>
            </div>

            <div className="row">
              <div className="col s3"></div>
              <div className="col s3">
                RoomName
                <input
                  onChange={this.onChange}
                  id="roomName"
                  type="text"
                  className="input-field inline"
                />
              </div>

              <div className="col s3">
                RoomDescription
                <input
                  onChange={this.onChange}
                  id="roomDescription"
                  type="text"
                  className="input-field inline"
                />
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
}

export default RoomCreator;
