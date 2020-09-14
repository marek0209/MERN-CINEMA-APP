import React from "react";
function RoomArrayView(props) {
  const roomSeatsPlan = props.arr;
  function conditionalRender(exist, booked) {
    return (
      <div
        className={`${exist ? "existingChair" : "notExistingChair"} ${
          booked ? "booked" : ""
        }`}
      ></div>
    );
  }

  return (
    <>
      <div className="card-image">
        {roomSeatsPlan.map((row, rowIndex) => (
          <div key={rowIndex} className="array-row">
            {row.map((chair, chairIndex) => (
              <div key={chairIndex}>
                {conditionalRender(chair.isExsist, chair.isBooked)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
export default RoomArrayView;
