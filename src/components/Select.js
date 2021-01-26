import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";
import _ from "lodash";
import * as actions from "../actions";

const mapOptions = ({ data }) => {
  return data.map((option) => ({
    value: option.id,
    label: `${option.first_name} ${option.last_name}`,
  }));
};

const loadOptions = _.debounce((inputValue, callback) => {
  if (!inputValue) {
    return callback([]);
  }
  const fetchURL = `https://www.balldontlie.io/api/v1/players?search=${inputValue}`;
  fetch(fetchURL).then((response) => {
    response.json().then((data) => {
      callback(mapOptions(data));
    });
  });
}, 500);

class Select extends Component {
  // state = { inputValue: "" };
  // handleInputChange = (newValue) => {
  //   this.setState({ inputValue: newValue });
  //   return;
  // };
  render() {
    return (
      <div>
        <AsyncSelect
          isMulti
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          defaultValue={{ value: 192, label: "James Harden" }}
          onChange={(e) => {
            this.props.updatePlayers(e);
          }}
          //onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default connect(null, actions)(Select);
