import { ReactElement, useEffect, useRef, useState } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SearchWrapperContainer from "../components/Home/HomeSearch";

import { GridContainer } from "../styles/container";

// GraphQL 관련
import { useQuery } from "@apollo/client";
import { SEARCH_PROJECT } from "@/services/gql/searchProject";
import { useSearchProject } from "@/stores/searchProjectStore";
import { useSelectStacks } from "@/stores/selectStackType/selectStacksStore";
import { useSelectTypes } from "@/stores/selectStackType/selectTypesStore";
import { getCategoryKey } from "@/lib/enum/projectCategoryEnum";
import Layout from "@/components/Layout/Layout";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 추가

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
  const { stackToggle, selectedStacks, clickStackToggle, resetStack } =
    useSelectStacks();
  const { typeToggle, selectedTypes, clickTypeToggle, resetType } =
    useSelectTypes();

  // 검색 조건 초기화
  useEffect(() => {
    if (stackToggle) {
      clickStackToggle();
    }
    resetStack();
    if (typeToggle) {
      clickTypeToggle();
    }
    resetType();
  }, [resetStack, resetType]);

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

  // 무한 스크롤
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

  // projects 배열에 새로운 데이터 추가
  useEffect(() => {
    if (data) {
      if (page === 0) {
        // 초기 페이지일 경우, 기존 데이터를 초기화
        setProjects(data.searchProject.projects);
      } else {
        // 추가 데이터만 병합
        setProjects([...projects, ...data.searchProject.projects]);
      }
      setHasNext(data.searchProject.hasNext);
      setIsLoading(false);
    }
  }, [data]);

  const handleSearchProject = () => {
    const newTitle = title;
    const newStackNames = selectedStacks;
    const newCategories = selectedTypes
      .map((category) => getCategoryKey(category))
      .filter((category): category is string => category !== undefined);
    setPage(0);
    setSearchTitle(newTitle);
    setStackNames(newStackNames);
    setCategories(newCategories);
    setIsLoading(true);

    refetch({
      page: 0,
      size: SIZE,
      title: newTitle,
      stackNames: newStackNames,
      categories: newCategories,
    })
      .then((result) => {
        if (result.data.searchProject === undefined) {
          setProjects([]);
        } else {
          setProjects(result.data.searchProject.projects);
        }
        setHasNext(result.data.searchProject.hasNext);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loadMoreProjects = async () => {
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
        {!isLoading && projects.length === 0 ? (
          <p style={{ marginTop: "20px", fontSize: "20px" }}>
            검색 결과가 없습니다
          </p>
        ) : (
          <GridContainer>
            {projects.map((project, index) => (
              <ProjectCard key={index} projectCard={project} />
            ))}

            <div
              ref={observerRef}
              style={{ height: "1px", backgroundColor: "transparent" }}
            />
          </GridContainer>
        )}
      </div>
    </>
  );
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
