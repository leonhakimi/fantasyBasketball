import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Search from "./Search";
import Select from './Select';


class App extends React.Component {
  render() {
    return (
      <div>
        <Select />
      </div>
    );
  }
}

export default connect(null, actions)(App);
