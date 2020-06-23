import React, { Component } from "react";
import { graphql } from "react-apollo";
import { withRouter } from "react-router-dom";
import songCreateMutate from "../mutations/createSong";
import fetchSongsQuery from "../queries/fetchSongs";

class SongCreate extends Component {
  state = { title: "" };

  onSubmit = (event) => {
    event.preventDefault();
    this.props
      .mutate({
        variables: { title: this.state.title },
        refetchQueries: [{ query: fetchSongsQuery }],
      })
      .then(() => {
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div>
        <h5>Create new Song</h5>
        <form onSubmit={this.onSubmit} className='song-create-form'>
          <label>Song Title</label>
          <input
            onChange={(e) => this.setState({ title: e.target.value })}
            value={this.state.title}
          />
        </form>
      </div>
    );
  }
}

export default withRouter(graphql(songCreateMutate)(SongCreate));
