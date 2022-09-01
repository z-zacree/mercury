import type { NextPage } from "next";
import { Layout } from "@layouts";

const Landing: NextPage = () => {
  return (
    <Layout
      title={"landing"}
      description="Welcome to Mercury, a blog website catered to finding places of interest in Singapore."
    >
      <span>Landing</span>
    </Layout>
  );
};

export default Landing;
