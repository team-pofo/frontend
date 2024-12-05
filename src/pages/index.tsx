// pages/index.tsx
import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import SearchWrapperContainer from "../components/Home/HomeSearch";

import { GridContainer } from "../styles/container";
import dummyData from "@/data/cardDummyDatas";

// GraphQL 관련
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";

interface Project {
  imageSrc: string;
  title: string;
  description: string;
  likes: number;
  author: string;
}

const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      currency
      languages {
        name
      }
    }
  }
`;

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(dummyData.slice(0, 10));
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code: "KR" }, // 대한민국의 ISO 국가 코드
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Country Information</h1>
      <p>
        <strong>Name:</strong> {data.country.name}
      </p>
      <p>
        <strong>Native Name:</strong> {data.country.native}
      </p>
      <p>
        <strong>Capital:</strong> {data.country.capital}
      </p>
      <p>
        <strong>Currency:</strong> {data.country.currency}
      </p>
      <ul>
        <strong>Languages:</strong>
        {data.country.languages.map((lang: any, index: number) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
    </div>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreProjects();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  });

  const loadMoreProjects = () => {
    const nextProjects = dummyData.slice(page * 10, (page + 1) * 10);
    setProjects((prev) => [...prev, ...nextProjects]);
    setPage((prev) => prev + 1);
  };

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
        <GridContainer>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
          <div ref={observerRef} />
        </GridContainer>
      </div>
    </>
  );
}
