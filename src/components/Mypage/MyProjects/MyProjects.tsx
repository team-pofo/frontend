import { SEARCH_PROJECT } from "@/services/gql/searchProject";
import { useSearchProject } from "@/stores/searchProjectStore";
import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import MypageProjectCard from "@/components/ProjectCard/Mypage/MypageProjectCard";
import { useAuthStore } from "@/stores/authStore";
import * as Styles from "./styles";

export default function MyProjectComponents() {
  const { page, hasNext, projects, setPage, setHasNext, setProjects, reset } =
    useSearchProject();
  const { user } = useAuthStore();

  const SIZE = 5;
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, loading, fetchMore } = useQuery(SEARCH_PROJECT, {
    variables: {
      page: page,
      size: SIZE,
      title: "",
      stackNames: [],
      categories: [],
      authorName: user?.username,
    },
  });

  useEffect(() => {
    reset();
  }, []);

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

  const loadMoreProjects = async () => {
    await fetchMore({
      variables: {
        page: page,
        size: 36,
        title: "",
        stackNames: [],
        categories: [],
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

  return (
    <Styles.MypageMyProjectsContainer>
      {!isLoading && projects.length === 0 ? (
        <p style={{ marginTop: "20px", fontSize: "20px" }}>
          등록한 프로젝트가 없습니다.
        </p>
      ) : (
        <div>
          {projects.map((project, index) => (
            <div key={index}>
              <MypageProjectCard projectCard={project} />
              <hr
                style={{
                  marginTop: "50px",
                  marginBottom: "50px",
                  borderColor: "black",
                }}
              ></hr>
            </div>
          ))}

          <div
            ref={observerRef}
            style={{ height: "1px", backgroundColor: "transparent" }}
          />
        </div>
      )}
    </Styles.MypageMyProjectsContainer>
  );
}
