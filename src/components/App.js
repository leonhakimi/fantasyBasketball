import React from "react";
import { connect } from "react-redux";
import * as d3 from "d3";
import * as actions from "../actions";
import Scatter from "./Scatter";
import Select from "./Select";
import Chart from "./Chart";

const yScale = d3
  .scaleLinear()
  .domain([0, 110])
  .range([250 - 30, 30]);

const xScale = d3
  .scaleTime()
  .domain([new Date("2021-02-01 00:00:00"), new Date("2021-02-07 00:00:00")])
  .range([30, 600 - 30]);

class App extends React.Component {
  render() {
    return (
      <div>
        <Select />
        {this.props.players ? (
          <Scatter
            xScale={xScale}
            yScale={yScale}
          />
        ) : (
          "Search for players to view data"
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.playerPool,
  };
}

export default connect(mapStateToProps, actions)(App);
