import React from "react";
import "./RoomArrayView.css";
function RoomArrayView(props) {
  const roomSeatsPlan = props.arr;
  function conditionalRender(value) {
    if (value) {
      return <div className="existingChair"></div>;
    } else {
      return <div className="notExistingChair"></div>;
    }
  }

  return (
    <>
      <div className="card-image">
        {roomSeatsPlan.map((row, rowIndex) => (
          <div key={rowIndex} className="array-row">
            {row.map((chair, chairIndex) => (
              <div key={chairIndex}>{conditionalRender(chair.isExsist)}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
export default RoomArrayView;
