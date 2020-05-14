import React from "react";
import LineGraph from "./component/LineGraph";
import Donut from "./component/PieChart";
import HealthNews from "./component/HealthNews";
import ValueBox from "./component/Valuebox";
import ProgressBar from "./component/ProgressBar";
import "./App.css";

class CovidLineGraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <LineGraph />
      </div>
    );
  }
}

class CovidPieGraph extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Donut />
      </div>
    );
  }
}

class CovidDataBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { confirmed: "", recovered: "", active: "", deaths: "" };
  }
  componentDidMount() {
    var dataArr = [];
    var recoveredVal = "";
    var deathsVal = "";
    var confirmedVal = "";
    var dArr = [];
    fetch("https://covid19.mathdro.id/api")
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var recovered = codata.recovered;
        var deaths = codata.deaths;
        var confirmed = codata.confirmed;
        recoveredVal = recovered.value;
        deathsVal = deaths.value;
        confirmedVal = confirmed.value;

        this.setState({
          confirmed: confirmedVal,
          active: confirmedVal - (recoveredVal + deathsVal),
          recovered: recoveredVal,
          deaths: deathsVal,
        });
        console.log("Step2 States");
        console.log(this.state.data);
      });
  }
  render() {
    return (
      <React.Fragment>
        <ValueBox
          boxtype="primary"
          title="Confirmed"
          description={this.state.confirmed}
        />
        <ValueBox
          boxtype="danger"
          title="Active"
          description={this.state.active}
        />
        <ValueBox
          boxtype="warning"
          title="Recovered"
          description={this.state.recovered}
        />
        <ValueBox
          boxtype="dark"
          title="Deaths"
          description={this.state.deaths}
        />
      </React.Fragment>
    );
  }
}

class CovidProgressBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sg: "", in: "", pk: "", my: "" };
  }

  componentDidMount() {
    fetch(
      "https://api.covid19api.com/live/country/sg/status/confirmed/date/2020-05-04T00:00:00Z"
    )
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var sgNewConfirmed = "";
        const rowLen = codata.length;
        var day1Confirmed = "";
        var day2Confirmed = "";
        codata.map((coarray, i) => {
          if (rowLen == i + 1) {
            day2Confirmed = coarray.Confirmed;
          } else if (rowLen - 1 == i + 1) {
            day1Confirmed = coarray.Confirmed;
          }
          return;
        });

        sgNewConfirmed = Math.ceil(
          ((day2Confirmed - day1Confirmed) * 100) / day1Confirmed
        );

        this.setState({ sg: sgNewConfirmed });
      });

    fetch(
      "https://api.covid19api.com/live/country/PK/status/confirmed/date/2020-05-04T00:00:00Z"
    )
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var pkNewConfirmed = "";
        const rowLen = codata.length;
        var day1Confirmed = "";
        var day2Confirmed = "";
        codata.map((coarray, i) => {
          if (rowLen == i + 1) {
            day2Confirmed = coarray.Confirmed;
          } else if (rowLen - 1 == i + 1) {
            day1Confirmed = coarray.Confirmed;
          }

          return;
        });

        pkNewConfirmed = Math.ceil(
          ((day2Confirmed - day1Confirmed) * 100) / day1Confirmed
        );

        this.setState({ pk: pkNewConfirmed });
      });

    fetch(
      "https://api.covid19api.com/live/country/MY/status/confirmed/date/2020-05-04T00:00:00Z"
    )
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var myNewConfirmed = "";
        const rowLen = codata.length;
        var day1Confirmed = "";
        var day2Confirmed = "";
        codata.map((coarray, i) => {
          if (rowLen == i + 1) {
            day2Confirmed = coarray.Confirmed;
          } else if (rowLen - 1 == i + 1) {
            day1Confirmed = coarray.Confirmed;
          }
          return;
        });

        myNewConfirmed = Math.ceil(
          ((day2Confirmed - day1Confirmed) * 100) / day1Confirmed
        );

        this.setState({ my: myNewConfirmed });
      });

    fetch(
      "https://api.covid19api.com/live/country/India/status/confirmed/date/2020-05-04T00:00:00Z"
    )
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var inNewConfirmed = "";
        const rowLen = codata.length;
        var day1Confirmed = "";
        var day2Confirmed = "";
        codata.map((coarray, i) => {
          if (rowLen == i + 1) {
            day2Confirmed = coarray.Confirmed;
          } else if (rowLen - 1 == i + 1) {
            day1Confirmed = coarray.Confirmed;
          }
          return;
        });

        inNewConfirmed = Math.ceil(
          ((day2Confirmed - day1Confirmed) * 100) / day1Confirmed
        );

        this.setState({ in: inNewConfirmed });
      });
  }

  render() {
    return (
      <React.Fragment>
        <ProgressBar boxtype="danger" title="Singapore" value={this.state.sg} />
        <ProgressBar boxtype="warning" title="India" value={this.state.in} />
        <ProgressBar boxtype="info" title="Pakistan" value={this.state.pk} />
        <ProgressBar boxtype="success" title="Malaysia" value={this.state.my} />
      </React.Fragment>
    );
  }
}

class CovidHealthNews extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <HealthNews />
      </div>
    );
  }
}

export {
  CovidLineGraph,
  CovidPieGraph,
  CovidDataBoxes,
  CovidProgressBar,
  CovidHealthNews,
};
