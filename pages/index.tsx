import type { NextPage } from "next";
import { Layout } from "@layouts";
import { useContext } from "react";
import { AuthContext } from "../utils/context/AuthContext";

const Landing: NextPage = () => {
  const { user, data } = useContext(AuthContext);
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
