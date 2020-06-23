import React, { Component } from "react";
import { graphql } from "react-apollo";
import lyricLikeMutate from "../mutations/likeLyric";

class LyricList extends Component {
  onLike = (id, likes) => {
    this.props.mutate({
      variables: { id: id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  };

  renderLyrics = () => {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className='collection-item'>
          {content}
          <div className='vote-box'>
            <i
              onClick={() => this.onLike(id, likes)}
              className='material-icons thumb'>
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  };

  render() {
    return <ul className='collection'>{this.renderLyrics()}</ul>;
  }
}

export default graphql(lyricLikeMutate)(LyricList);
