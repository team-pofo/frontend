import { gql } from "@apollo/client";

export const SEARCH_PROJECT = gql`
  query SearchProject(
    $page: Int
    $size: Int
    $title: String
    $stackNames: [String]
    $categories: [ProjectCategory]
    $authorName: String
  ) {
    searchProject(
      projectSearchRequest: {
        page: $page
        size: $size
        title: $title
        stackNames: $stackNames
        categories: $categories
        authorName: $authorName
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
        authorName
      }
    }
  }
`;
