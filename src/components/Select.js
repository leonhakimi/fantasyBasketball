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
  render() {
    return (
      <div>
        <AsyncSelect
          isMulti
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onChange={(e) => {
            this.props.updatePlayers(e);
          }}
        />
      </div>
    );
  }
}

export default connect(null, actions)(Select);
