// pages/index.tsx
import { useState, useEffect, useRef } from "react";
import ProjectCard from "@/components/ProjectCard/projectCard";

import { GridContainer } from "./styles";
import dummyData from "@/data/cardDummyDatas";

interface Project {
  imageSrc: string;
  title: string;
  description: string;
  likes: number;
  author: string;
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(dummyData.slice(0, 10));
  const [page, setPage] = useState(1);
  const observerRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const loadMoreProjects = () => {
    const nextProjects = dummyData.slice(page * 10, (page + 1) * 10);
    setProjects((prev) => [...prev, ...nextProjects]);
    setPage((prev) => prev + 1);
  };
  // ??

  return (
    <GridContainer>
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
      <div ref={observerRef} />
    </GridContainer>
  );
}
