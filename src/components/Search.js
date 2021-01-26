import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import axios from "axios";
import * as actions from '../actions';

const Search = () => {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setDebouncedTerm(term);
    }, 100);

    
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        "https://www.balldontlie.io/api/v1/players",
        {
          params: {
            search: debouncedTerm,
          },
        }
      );
      setResults(data.data);
    };

    if (debouncedTerm) {
      search();
    }
  }, [debouncedTerm]);

  
  const renderList = results.map((result) => {
    return (
      <div key={result.id} className="item">
        <div className="content">
          <b>{result.team.abbreviation}</b>
          {" - "}
          {result.last_name}, {result.first_name}
        </div>
        <button>Add</button>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Search for a Player</label>
          <input
            className="input"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="results">
          <div className="ui list">{renderList}</div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, actions)(Search);
