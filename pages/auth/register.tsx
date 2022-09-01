import { NextPage } from "next";
import { Layout } from "@layouts";

const Register: NextPage = () => {
  return (
    <Layout
      title="Register"
      description="Register for an account with Mercury. We support integrations with Google, Github or Email to upload, save and like blog posts for free!"
    >
      <h1>Register</h1>
    </Layout>
  );
};

export default Register;
