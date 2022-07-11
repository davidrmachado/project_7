import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: undefined,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const { match: { params: { id } } } = this.props;
    const dataMusics = await getMusics(id);
    this.setState({ musics: dataMusics });
  };

  render() {
    const { musics } = this.state;
    return (
      <div>
        {musics !== undefined && (
          <div data-testid="page-album">
            <Header />
            <div data-testid="artist-name">{musics[0].artistName}</div>
            <div data-testid="album-name">{musics[0].collectionName}</div>
            {musics.map((music) => {
              if (music.kind !== 'song') {
                return;
              }
              return (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.obj,
}.isRequired;

export default Album;
