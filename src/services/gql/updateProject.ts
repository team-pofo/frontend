import { gql } from "@apollo/client";

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $projectId: ID!
    $title: String!
    $bio: String!
    $urls: [String]
    $imageUrls: [String]
    $content: String!
    $categories: [ProjectCategory]
    $stackNames: [String]
  ) {
    updateProject(
      projectUpdateRequest: {
        projectId: $projectId
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
