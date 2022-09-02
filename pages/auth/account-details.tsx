import { DetailLayout } from "@layouts";
import { AuthContext } from "@utils/context/AuthProvider";
import { NextPage } from "next";
import { useContext } from "react";

const AccountSignUpDetails: NextPage = () => {
  const {
    state: { user, data, isLoading },
  } = useContext(AuthContext);
  console.log(data);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DetailLayout
      title="Details"
      description="Welcome to Mercury, now let's get some details about you."
    >
      <h1>Welcome to Mercury, now let's get some details about you.</h1>
    </DetailLayout>
  );
};

export default AccountSignUpDetails;
