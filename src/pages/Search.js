import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchParam: '',
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchParam: value,
    });
  }

  render() {
    const { searchParam } = this.state;
    const minChar = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          type="text"
          name="searchParam"
          value={ searchParam }
          onChange={ this.handleChange }
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ searchParam.length < minChar }
        >
          Buscar
        </button>
      </div>
    );
  }
}

export default Search;
