import { gql } from "apollo-boost";

export default gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;
