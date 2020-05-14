import React from "react";

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //primary or success or info or warning
    return (
      <React.Fragment>
        <h4 className="small font-weight-bold">
          {this.props.title}
          <span className="float-right">{this.props.value}%</span>
        </h4>
        <div className="progress mb-4">
          <div
            className={"progress-bar bg-" + this.props.boxtype}
            role="progressbar"
            style={{ width: this.props.value + "%" }}
            aria-valuenow={this.props.value}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </React.Fragment>
    );
  }
}
export default ProgressBar;
