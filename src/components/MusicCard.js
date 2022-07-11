import React, { Component } from 'react';
import propTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }

addFavorites = async ({ target }) => {
  const { music } = this.props;
  this.setState({ isLoading: true });
  if (target.checked) await addSong(music);
  this.setState({ isLoading: false });
}

render() {
  const { trackName, previewUrl, trackId, favs } = this.props;
  const { isLoading } = this.state;
  return (
    <div>
      {isLoading && <Loading />}
      <h4>{ trackName }</h4>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        <code>audio</code>
      </audio>
      <label htmlFor="fav">
        Favorita
        <input
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          id="fav"
          checked={ favs }
          onChange={ this.addFavorites }
        />
      </label>
    </div>
  );
}
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
}.isRequired;

export default MusicCard;
