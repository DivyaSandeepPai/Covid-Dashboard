import React from "react";

class ValueBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //primary or success or info or warning
    return (
      <div class="col-xl-3 col-md-6 mb-4">
        <div
          class={
            "card border-left-" + this.props.boxtype + " shadow h-100 py-2"
          }
        >
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2">
                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                  {this.props.title}
                </div>
                <div class="h5 mb-0 font-weight-bold text-gray-800">
                  {this.props.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ValueBox;
