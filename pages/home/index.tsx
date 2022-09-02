import { Button } from "@chakra-ui/react";
import { Layout } from "@layouts";
import { auth } from "@utils/firebase";
import { signOut } from "firebase/auth";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout
      title="Home"
      description="Welcome to Mercury, a blog website catered to finding places of interest in Singapore."
    >
      <span>Home</span>
      <Button onClick={() => signOut(auth)}></Button>
    </Layout>
  );
};

export default Home;
