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

export const GET_CHARACTER = gql`
  query GET_CHARACTER($id: ID!) {
    character(id: $id) {
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
        id
        name
        air_date
        episode
        characters {
          name
        }
      }
    }
  }
`;
