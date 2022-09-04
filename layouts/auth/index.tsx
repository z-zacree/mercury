import { Box, Center, CircularProgress, Divider, Flex, Text } from "@chakra-ui/react";
import { AuthContext } from "@utils/context/AuthProvider";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useEffect } from "react";
import { Layout } from "..";

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description: string;
}

const AuthLayout: FC<LayoutProps> = ({ children, description, title }) => {
  const router = useRouter();
  const {
    state: { user, data, isLoading },
  } = useContext(AuthContext);
  useEffect(() => {
    if (!isLoading && user) {
      if (!data?.fullname || !data?.username) router.push("/account-details");
      else router.push("/home");
    }
  }, [user]);

  return (
    <Layout title={title} description={description}>
      {isLoading || user ? (
        <Center minH={"100vh"} gap={4}>
          <CircularProgress isIndeterminate color={"gray"} size={8} />
          <Text fontWeight={200}>Hold on — getting this page ready for you</Text>
          <Box pos={"absolute"} top={0} left={0} right={0}>
            <Flex m={4} justify={"space-between"}>
              <Text fontFamily={"montserrat"} fontWeight={500} fontSize={"lg"} children="Mercury" />
              <Image src={"/Logo@2x.png"} width={28} height={28} />
            </Flex>
            <Divider />
          </Box>
        </Center>
      ) : (
        children
      )}
    </Layout>
  );
};

export default AuthLayout;
