import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject {
    createProject(
      content: "testContent1"
      title: "testTitle1"
      bio: "testBio1"
      urls: null
      imageUrls: null
      category: CATEGORY_A
    ) {
      title
      bio
      urls
      imageUrls
      content
      isApproved
      category
      id
    }
  }
`;
