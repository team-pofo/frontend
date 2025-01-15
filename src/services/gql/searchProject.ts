import { gql } from "@apollo/client";

export const SEARCH_PROJECT = gql`
  query SearchProject(
    $page: Int
    $size: Int
    $title: String
    $stackNames: [String]
    $categories: [ProjectCategory]
  ) {
    searchProject(
      projectSearchRequest: {
        page: $page
        size: $size
        title: $title
        stackNames: $stackNames
        categories: $categories
      }
    ) {
      count
      hasNext
      projects {
        id
        title
        imageUrls
        likes
        bio
      }
    }
  }
`;
