// pages/index.tsx
import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SearchWrapperContainer from "../components/Home/HomeSearch";

import { GridContainer } from "../styles/container";

// GraphQL 관련
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface Project {
  // likes: number;
  // author: string;

  __typename: string;
  title: string;
  imageUrls: string;
  id: string;
  bio: string;
}

const getProjectId = gql`
  query ProjectById {
    projectById(projectId: 1) {
      id
      title
      bio
      urls
      imageUrls
      content
      isApproved
      category
    }
  }
`;

const getProjects = gql`
  query getAllProjectsByPagination($size: Int!, $cursor: Int!) {
    getAllProjectsByPagination(size: $size, cursor: $cursor) {
      hasNext
      projectCount
      projects {
        title
        imageUrls
        id
        bio
      }
    }
  }
`;

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [cursor, setCursor] = useState(40);
  const [hasNext, setHasNext] = useState(false);

  const observerRef = useRef<HTMLDivElement>(null);
  const { data, loading, error, fetchMore } = useQuery(getProjects, {
    variables: { size: 20, cursor: 21 },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Intersection entries:", entries);
        console.log(entries[0].isIntersecting);
        console.log(hasNext);
        console.log(data?.getAllProjectsByPagination.hasNext);
        console.log(data?.getAllProjectsByPagination);
        console.log(data);
        if (entries[0].isIntersecting && hasNext) {
          console.log("Loading more projects...");
          loadMoreProjects();
        }
      },
      { threshold: 0.8 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef, data]);

  useEffect(() => {
    if (data) {
      setProjects((prev) => [
        ...prev,
        ...data.getAllProjectsByPagination.projects,
      ]);
      setHasNext(data.getAllProjectsByPagination.hasNext);
      console.log(data.getAllProjectsByPagination.projects);
    }
  }, [data]);

  const loadMoreProjects = () => {
    fetchMore({
      variables: { cursor: cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          getAllProjectsByPagination: {
            ...fetchMoreResult.getAllProjectsByPagination,
            projects: [
              // ...prevResult.getAllProjectsByPagination.projects,
              ...fetchMoreResult.getAllProjectsByPagination.projects,
            ],
          },
        };
      },
    });

    setCursor((prev) => prev + 20); // cursor 값 업데이트
  };

  if (loading) return <p>Loading...</p>; // 로딩중일 때 카드 스켈레톤 보여주기
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <SearchWrapperContainer />
        <div onClick={loadMoreProjects}>loadMore</div>
        <GridContainer>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
          <div
            ref={observerRef}
            style={{ height: "1px", backgroundColor: "transparent" }}
          />
        </GridContainer>
      </div>
    </>
  );
}
