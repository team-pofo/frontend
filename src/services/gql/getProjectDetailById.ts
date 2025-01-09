import { gql } from "@apollo/client";

export const GET_PROJECT_BY_ID = gql`
  query ProjectById($projectId: ID!) {
    projectById(projectId: $projectId) {
      id
      title
      bio
      urls
      imageUrls
      content
      isApproved
      categories
      stacks
      authorName
    }
  }
`;
