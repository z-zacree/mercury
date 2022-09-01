import { NextPage } from "next";
import { Layout } from "@layouts";

const Login: NextPage = () => {
  return (
    <Layout
      title="Login"
      description="Login to your account with Mercury. We support integrations with Google, Github or Email to upload, save and like blog posts for free!"
    >
      <h1>Login</h1>
    </Layout>
  );
};

export default Login;
