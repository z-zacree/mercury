import { NextPage } from "next";
import { AuthLayout } from "@layouts";

const AccountSignUpDetails: NextPage = () => {
  return (
    <AuthLayout
      title="Login"
      description="Login to your account with Mercury. We support integrations with Google, Github or Email to upload, save and like blog posts for free!"
    >
      <h1>Login</h1>
    </AuthLayout>
  );
};

export default AccountSignUpDetails;
