import React, { PureComponent } from "react";
import { PieChart, Pie, Sector } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.color}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.color}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} Cases, `}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#e74a3b"
      >
        {`( ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

class Donut extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { items: [], activeIndex: 0 };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  componentDidMount() {
    fetch(
      "https://api.covid19api.com/live/country/India/status/confirmed/date/2020-05-05T00:00:00Z"
    )
      .then((covidjson) => {
        return covidjson.json();
      })
      .then((codata) => {
        var dataCovidList = [];
        const rowLen = codata.length;
        codata.map((coarray, i) => {
          if (rowLen == i + 1) {
            dataCovidList = new Array(
              { name: "Recovered", value: coarray.Recovered, color: "#1cc88a" },
              { name: "Deaths", value: coarray.Deaths, color: "#858796" },
              { name: "Active", value: coarray.Active, color: "#e74a3b" }
            );
          }
          return;
        });

        this.setState({ data: dataCovidList });
      });
  }
  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.state.data}
          cx={190}
          cy={160}
          innerRadius={80}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
    );
  }
}
export default Donut;
