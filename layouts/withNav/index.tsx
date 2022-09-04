import {
  Box,
  Button,
  Container,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AuthContext } from "@utils/context/AuthProvider";
import { useWindowSize } from "@utils/hooks/index";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, useContext, useRef } from "react";
import { TbSearch } from "react-icons/tb";
import { Layout } from "..";

import dynamic from "next/dynamic";

const DynamicSearch = dynamic(() => import("./search"), { ssr: false });
const DynamicDropdown = dynamic(() => import("./dropdown"), { ssr: false });
const AnimatedMenuIcon = dynamic(() => import("../../components/layout/animatedMenuIcon"), {
  ssr: false,
});

interface LayoutProps extends PropsWithChildren {
  title?: string;
  description: string;
}

const NavbarLayout: FC<LayoutProps> = ({ children, title, description }) => {
  const router = useRouter();
  const {
    state: { user, isLoading },
  } = useContext(AuthContext);
  const windowSize = useWindowSize();
  const aRef = useRef<HTMLDivElement>(null);
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: searchIsOpen, onOpen, onClose } = useDisclosure();
  return (
    <Layout title={title} description={description}>
      <Container
        left={0}
        right={0}
        maxW={"6xl"}
        pos={"sticky"}
        px={{ lg: 4 }}
        mb={{ lg: 4 }}
        zIndex={"popover"}
        top={{ base: 0, lg: 4 }}
        transition={"0.4s ease-out 0s"}
      >
        <Box
          p={4}
          borderRadius={{ lg: "lg" }}
          transition={"0.4s ease-out 0s"}
          bg={useColorModeValue("white", "black")}
        >
          <HStack gap={2}>
            {searchIsOpen ? (
              <DynamicSearch onClose={onClose} />
            ) : (
              <>
                <IconButton aria-label="Toggle menu" variant={"ghost"} onClick={onToggle}>
                  <AnimatedMenuIcon isOpen={isOpen} />
                </IconButton>
                <Text fontSize={"lg"} fontWeight={500} fontFamily={"montserrat"}>
                  Mercury
                </Text>
                <Spacer />
                {!isLoading &&
                  (user ? (
                    <IconButton icon={<TbSearch />} aria-label={"Search"} onClick={onOpen} />
                  ) : (
                    <>
                      <IconButton icon={<TbSearch />} aria-label={"Search"} onClick={onOpen} />
                      <Button size={"md"} onClick={() => router.push("/login")}>
                        Login
                      </Button>
                      <Button
                        size={"md"}
                        display={{
                          base: "none",
                          md: "inline-flex",
                        }}
                        onClick={() => router.push("/register")}
                      >
                        Sign Up
                      </Button>
                    </>
                  ))}
              </>
            )}
          </HStack>
          <Box
            ref={aRef}
            overflow={"hidden"}
            transition={"0.4s ease-out 0s"}
            h={
              isOpen && windowSize.width >= 992 && !searchIsOpen
                ? `${aRef.current?.scrollHeight}px`
                : 0
            }
          >
            <DynamicDropdown />
          </Box>
        </Box>
      </Container>
      <Container pt={4} maxW={"6xl"} minH={"300vh"}>
        {children}
      </Container>
    </Layout>
  );
};

export default NavbarLayout;
