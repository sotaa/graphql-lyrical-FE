import { gql } from "apollo-boost";

export default gql`
  {
    songs {
      id
      title
    }
  }
`;
