import React, { PureComponent } from "react";
import {
  LineChart,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

var dateFormat = require("dateformat");

export default class Example extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount() {
    //https://api.covid19api.com/live/country/India/status/confirmed/date/2020-03-21T13:13:30Z
    fetch("https://api.covid19api.com/total/dayone/country/india")
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var dataCovidList = [];

        codata.map((coarray) => {
          var dataCovid = {
            Date: dateFormat(coarray.Date, "mmm d"),
            Confirmed: coarray.Confirmed,
            Deaths: coarray.Deaths,
            Recovered: coarray.Recovered,
          };
          dataCovidList.push(dataCovid);
          return;
        });

        this.setState({ items: dataCovidList });
      });
  }
  render() {
    return (
      <ResponsiveContainer aspect={2.5}>
        <ComposedChart width={700} height={300} data={this.state.items}>
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#f5f5f5" />
          <Area
            type="monotone"
            dataKey="Recovered"
            fill="#8884d8"
            stroke="#413ea0"
            strokeWidth="1"
          />
          <Bar dataKey="Confirmed" barSize={5} fill="#FF0000" />
          <Line
            type="monotone"
            dataKey="Deaths"
            stroke="#000000"
            strokeWidth="1"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
