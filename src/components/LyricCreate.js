import React, { Component } from "react";
import { graphql } from "react-apollo";
import lyricCreateMutate from "../mutations/createLyric";

class LyricCreate extends Component {
  state = { content: "" };

  onSubmit = (event) => {
    event.preventDefault();
    this.props
      .mutate({
        variables: {
          content: this.state.content,
          songId: this.props.songId,
        },
      })
      .then(() => this.setState({ content: "" }));
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>Add a Lyric</label>
          <input
            value={this.state.content}
            onChange={(e) => this.setState({ content: e.target.value })}
          />
        </form>
      </div>
    );
  }
}

export default graphql(lyricCreateMutate)(LyricCreate);
