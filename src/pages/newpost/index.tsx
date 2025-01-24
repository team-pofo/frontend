import Layout from "@/components/Layout/Layout";
import NewpostComponents from "@/components/Newpost/Newpost";
import { ReactElement } from "react";

const Newpost = () => {
  return (
    <div>
      <NewpostComponents />
    </div>
  );
};

Newpost.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Newpost;
