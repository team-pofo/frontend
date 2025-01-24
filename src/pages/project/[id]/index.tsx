import Layout from "@/components/Layout/Layout";
import ProjectComponents from "@/components/Project/Project";
import { ReactElement } from "react";

const Project = () => {
  return <ProjectComponents />;
};

Project.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
export default Project;
