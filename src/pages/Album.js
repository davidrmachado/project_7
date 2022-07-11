import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      musics: undefined,
      favList: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
    this.getData();
  }

  getFavorites = async () => {
    // this.setState({ isLoading: true });
    const favList = await getFavoriteSongs();
    this.setState({ favList });
    // this.setState({ isLoading: false });
  }

  getData = async () => {
    const { match: { params: { id } } } = this.props;
    const dataMusics = await getMusics(id);
    this.setState({ musics: dataMusics });
  };

  render() {
    const { musics, favList } = this.state;
    return (
      <div>
        <Header />
        {musics !== undefined && (
          <div data-testid="page-album">
            <div data-testid="artist-name">{musics[0].artistName}</div>
            <div data-testid="album-name">{musics[0].collectionName}</div>
            {musics.map((music) => {
              if (music.kind !== 'song') {
                return;
              } if (favList.some((song) => music.trackId === song.trackId)) {
                return (
                  <div key={ music.trackId }>
                    <MusicCard
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      trackId={ music.trackId }
                      music={ music }
                      favs
                    />
                  </div>
                );
              }
              return (
                <div key={ music.trackId }>
                  <MusicCard
                    trackName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    trackId={ music.trackId }
                    music={ music }
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
