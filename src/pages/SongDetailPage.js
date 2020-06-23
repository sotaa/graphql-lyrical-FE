import React, { Component } from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import fetchSOngQuery from "../queries/fetchSong";
import LyricList from "../components/LyricList";
import LyricCreate from "../components/LyricCreate";

class SongDetail extends Component {
  detail = () => {
    const { song } = this.props.data;
    return !song ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h5 className='song-title'>{song.title}</h5>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.match.params.id} />
      </div>
    );
  };

  render() {
    return <div className='container'>{this.detail()}</div>;
  }
}

export default withRouter(
  graphql(fetchSOngQuery, {
    options: (props) => {
      return { variables: { id: props.match.params.id } };
    },
  })(SongDetail),
);
