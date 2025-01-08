import { gql } from "@apollo/client";

export const GET_ALL_PROJECTS = gql`
  query getAllProjectsByPagination($size: Int!, $cursor: Int!) {
    getAllProjectsByPagination(size: $size, cursor: $cursor) {
      hasNext
      count
      projects {
        title
        imageUrls
        id
        bio
      }
    }
  }
`;
