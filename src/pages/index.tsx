import { useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SearchWrapperContainer from "../components/Home/HomeSearch";

import { GridContainer } from "../styles/container";

// GraphQL 관련
import { useQuery } from "@apollo/client";
import { SEARCH_PROJECT } from "@/services/gql/searchProject";
import { useSearchProject } from "@/stores/searchProjectStore";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";

export default function Home() {
  const {
    page,
    title,
    hasNext,
    searchTitle,
    stackNames,
    categories,
    projects,
    setPage,
    setSearchTitle,
    setStackNames,
    setCategories,
    setHasNext,
    setProjects,
  } = useSearchProject();
  const { selectedStacks } = useSelectStacks();
  const { selectedTypes } = useSelectTypes();

  const SIZE = 36;

  const observerRef = useRef<HTMLDivElement>(null);
  const { data, loading, fetchMore, refetch } = useQuery(SEARCH_PROJECT, {
    variables: {
      page: page,
      size: SIZE,
      title: searchTitle,
      stackNames: stackNames,
      categories: categories,
    },
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
      setProjects([...projects, ...data.searchProject.projects]);
      setHasNext(data.searchProject.hasNext);
    }
  }, [data]);

  const handleSearchProject = () => {
    const newTitle = title;
    const newStackNames = selectedStacks;
    const newCategories = selectedTypes;
    setPage(0);
    setSearchTitle(newTitle);
    setStackNames(newStackNames);
    setCategories(newCategories);

    refetch({
      page: 0,
      size: SIZE,
      title: newTitle,
      stackNames: newStackNames,
      categories: newCategories,
    }).then((result) => {
      setProjects(result.data.searchProject.projects);
      setHasNext(result.data.searchProject.hasNext);
    });
  };

  const loadMoreProjects = async () => {
    console.log("loadMoreProjectsssssssss");
    console.log(page);
    await fetchMore({
      variables: {
        page: page,
        size: 36,
        title: searchTitle,
        stackNames: stackNames,
        categories: categories,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        else {
          setHasNext(fetchMoreResult.searchProject.hasNext);
          setPage(page + 1);
        }
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
        <SearchWrapperContainer handleSearchProject={handleSearchProject} />
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
