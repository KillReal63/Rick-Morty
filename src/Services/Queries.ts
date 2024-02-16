import { gql } from "@apollo/client";

export const MAIN_LIST = gql`
  query MAIN_LIST($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        status
        species
        image
        gender
        origin {
          name
        }
        location {
          name
          type
          dimension
          residents {
            name
          }
        }
        episode {
          name
        }
      }
    }
  }
`;
