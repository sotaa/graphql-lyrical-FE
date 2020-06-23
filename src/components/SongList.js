import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import fetchSongsQuery from "../queries/fetchSongs";
import deleteSongMutate from "../mutations/deleteSong";

class SongList extends Component {
  onSongDelete = (id) => {
    this.props
      .mutate({
        variables: { id: id },
      })
      .then(() => this.props.data.refetch());
  };

  renderSongs = () => {
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className='collection-item'>
          <Link to={`/songs/${id}`}>{title}</Link>
          <i
            className='material-icons trash'
            onClick={() => this.onSongDelete(id)}>
            delete
          </i>
        </li>
      );
    });
  };

  render() {
    return this.props.data.loading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h5>Song list</h5>
        <ul className='collection song-table'>{this.renderSongs()}</ul>
        <Link to='/songs/new' className='btn-floating btn-larg red right'>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(deleteSongMutate)(graphql(fetchSongsQuery)(SongList));
