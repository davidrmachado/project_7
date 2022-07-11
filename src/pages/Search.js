import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchParam: '',
      isLoading: false,
      searchedWord: '',
      searchResult: [],
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchParam: value,
    });
  }

  onSearchClick = async () => {
    const { searchParam } = this.state;
    this.isLoading = true;
    const result = await searchAlbumsAPI(searchParam);
    this.setState({ searchedWord: searchParam });
    this.setState({ searchParam: '' });
    this.isLoading = false;
    this.setState({ searchResult: result });
  }

  renderResult = () => {
    const { searchResult } = this.state;
    if (searchResult.length === 0) {
      return <span>Nenhum álbum foi encontrado</span>;
    }
    return searchResult.map((result) => (
      <div key={ `${result.collectionId}` }>
        <img src={ result.artworkURL100 } alt={ result.collectionName } />
        <span>{ result.artistName }</span>
        <span>{ result.collectionName }</span>
        <Link
          data-testid={ `link-to-album-${result.collectionId}` }
          to={ `/album/${result.collectionId}` }
        >
          {`${result.collectionId}`}
        </Link>
      </div>
    ));
  }

  render() {
    const { searchParam, isLoading, searchedWord } = this.state;
    const minChar = 2;
    return (
      <div data-testid="page-search">
        <Header />
        { isLoading ? <Loading /> : (
          <form>
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchParam"
              value={ searchParam }
              onChange={ this.handleChange }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ searchParam.length < minChar }
              onClick={ this.onSearchClick }
            >
              Buscar
            </button>
          </form>
        )}
        <p>{`Resultado de álbuns de: ${searchedWord}`}</p>
        { this.renderResult() }
      </div>
    );
  }
}

export default Search;
