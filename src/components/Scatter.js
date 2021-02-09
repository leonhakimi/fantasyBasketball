import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { YAxis } from "recharts";

class Scatter extends React.Component {
  componentDidMount() {
    const xAxis = d3.axisBottom().ticks(6).scale(this.props.xScale);
    const yAxis = d3.axisLeft().scale(this.props.yScale);
    d3.select("#Scatter-Xaxis").call(xAxis);
    d3.select("#Scatter-Yaxis").call(yAxis);
  }
  render() {
    // const dataset = [
    //   { points: 52, date: new Date("2021-02-01T00:00:00.000Z") },
    //   { points: 78, date: new Date("2021-02-03T00:00:00.000Z") },
    //   { points: 60, date: new Date("2021-02-04T00:00:00.000Z") },
    // ];

    // const w = 600;
    // const h = 250;

    // const xScale = d3
    //   .scaleTime()
    //   .domain([
    //     new Date("2021-02-01 00:00:00"),
    //     new Date("2021-02-07 00:00:00"),
    //   ])
    //   .range([30, w - 30]);

    // const yScale = d3
    //   .scaleLinear()
    //   .domain([0, 110])
    //   .range([h - 30, 30]);

    // const xAxis = d3.axisBottom().ticks(6).scale(xScale);
    // const yAxis = d3.axisLeft().scale(yScale);
    // const stats = dataset.map((gamelog) => (
    //   <circle
    //     cx={xScale(gamelog.date) + 30}
    //     cy={yScale(gamelog.points)}
    //     r="3"
    //   ></circle>
    // ));
    const drawScatter = () => {
      return this.props.players.map((player) => (
        <circle
          cx={this.props.xScale(player.date) + 30}
          cy={this.props.yScale(player.pts)}
          r="3"
        ></circle>
      ));
    };

    return (
      <svg width={600} height={250}>
        {drawScatter()}
        <g
          id="Scatter-Xaxis"
          className="axis"
          transform={`translate(0, ${250 - 30})`}
        ></g>
        <g
          id="Scatter-Yaxis"
          className="axis"
          transform={"translate(30, 0)"}
        ></g>
      </svg>
    );
  }
}
function mapStateToProps(state) {
  return {
    players: state.playerPool,
  };
}

export default connect(mapStateToProps, {})(Scatter);
