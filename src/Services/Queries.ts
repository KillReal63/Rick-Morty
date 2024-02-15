import { gql } from "@apollo/client";

export const MAIN_LIST = gql`
  query MAIN_LIST {
    characters(page: 5) {
      results {
        id
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
