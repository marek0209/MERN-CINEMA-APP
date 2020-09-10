import React from "react";
import DateForm from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class DatePicker extends React.Component {
  state = {
    startDate: new Date(),
  };

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
    this.props.getDate(date);
  };

  render() {
    return (
      <DateForm selected={this.state.startDate} onChange={this.handleChange} />
    );
  }
}
export default DatePicker;
