import { gql } from "@apollo/client";

export const SEARCH_PROJECT = gql`
  query SearchProject($page: Int, $size: Int) {
    searchProject(projectSearchRequest: { page: $page, size: $size }) {
      count
      hasNext
      projects {
        id
        title
        imageUrls
        likes
      }
    }
  }
`;
