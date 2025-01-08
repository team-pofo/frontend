import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $title: String!
    $bio: String!
    $urls: [String]
    $imageUrls: [String]
    $content: String!
    $categories: [ProjectCategory]
    $stackNames: [String]
  ) {
    createProject(
      projectCreateRequest: {
        title: $title
        bio: $bio
        urls: $urls
        imageUrls: $imageUrls
        content: $content
        categories: $categories
        stackNames: $stackNames
      }
    ) {
      id
    }
  }
`;
