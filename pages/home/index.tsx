import { NextPage } from "next";
import { Layout } from "@layouts";

const Home: NextPage = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to Mercury, a blog website catered to finding places of interest in Singapore."
    >
      <span>Home</span>
    </Layout>
  );
};

export default Home;
