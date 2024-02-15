import { gql } from "@apollo/client";

export const MAIN_LIST = gql`
  query {
    characters(page: 3) {
      results {
        name
        status
        species
        image
        location {
          name
        }
        episode {
          name
        }
      }
    }
  }
`;
