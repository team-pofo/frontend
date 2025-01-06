import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SearchWrapperContainer from "../components/Home/HomeSearch";

import { GridContainer } from "../styles/container";

// GraphQL 관련
import { useQuery } from "@apollo/client";
import { IProjectCard } from "@/libs/interface/iProjectCard";
import { SEARCH_PROJECT } from "@/services/gql/searchProject";

export default function Home() {
  const [projects, setProjects] = useState<IProjectCard[]>([]);
  const [page, setPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const SIZE = 36;

  const observerRef = useRef<HTMLDivElement>(null);
  const { data, loading, fetchMore } = useQuery(SEARCH_PROJECT, {
    variables: { size: SIZE, page: page },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          loadMoreProjects();
        }
      },
      { threshold: 0.8 },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef, data, hasNext, loading]);

  useEffect(() => {
    if (data) {
      console.log(data);
      console.log("hasNext", data.searchProject.hasNext);
      console.log(page);

      setProjects((prev) => [...prev, ...data.searchProject.projects]);
      setHasNext(data.searchProject.hasNext);
    }
  }, [data, page]);

  const loadMoreProjects = async () => {
    await fetchMore({
      variables: { page: page, size: 36 },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          searchProject: {
            ...fetchMoreResult.searchProject,
            projects: [
              // ...prevResult.getAllProjectsByPagination.projects,
              ...fetchMoreResult.searchProject.projects,
            ],
          },
        };
      },
    });

    setPage((prev) => prev + 1);
  };

  // if (loading) return <p>Loading...</p>; // 로딩중일 때 카드 스켈레톤 보여주기
  // if (error) return <p>Error: {error.message}</p>;

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
        {/* <div onClick={loadMoreProjects}>loadMore</div> */}
        <GridContainer>
          {projects.map((project, index) => (
            <ProjectCard key={index} projectCard={project} />
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
