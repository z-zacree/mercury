import { FC, PropsWithChildren, useContext } from "react";
import { Layout } from "..";
import { AuthContext } from "utils/context/AuthContext";
import { Box, Center, CircularProgress, Divider, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthLayout from ".";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description: string;
}

const AccountDetailsLayout: FC<LayoutProps> = ({ children, description, title }) => {
  const router = useRouter();
  const { user, data, isLoading } = useContext(AuthContext);

  return <AuthLayout title={title} description={description}></AuthLayout>;
};

export default AccountDetailsLayout;
