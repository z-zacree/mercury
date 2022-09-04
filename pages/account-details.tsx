import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  Kbd,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { DetailLayout } from "@layouts";
import { AuthContext } from "@utils/context/AuthProvider";
import { fs } from "@utils/firebase";
import { UserData } from "@utils/models";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextPage } from "next";
import Image from "next/image";
import { Fragment, ReactNode, useContext, useEffect, useState } from "react";
import { MdArrowRightAlt, MdKeyboardReturn } from "react-icons/md";
import { TbChevronDown, TbChevronUp } from "react-icons/tb";

const AccountSignUpDetails: NextPage = () => {
  const [pageIndex, setIndex] = useState(0);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    state: { user, data },
    dispatch,
  } = useContext(AuthContext);

  const prompts: ReactNode[] = [
    <Center h={"full"}>
      <Box>
        <Heading>Welcome to Mercury!</Heading>
        <Text color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}>
          Now that you&apos;re here, let&apos;s get you set up.
        </Text>

        <Button mt={4} onClick={() => setIndex(1)} gap={4}>
          Continue
          <Kbd display={{ base: "none", lg: "unset" }}>
            <MdKeyboardReturn />
          </Kbd>
        </Button>
      </Box>
    </Center>,
    <Center h={"full"} mr={[12, null, null, 0]}>
      <Flex>
        <Box mr={2}>
          <Flex gap={1} mt={1} align={"center"}>
            <Text fontSize={20}>1</Text>
            <MdArrowRightAlt size={18} />
          </Flex>
        </Box>
        <VStack gap={4} align={"start"}>
          <Box>
            <Heading>What is your full name?</Heading>
            <Text color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}>
              Your full name. Don&apos;t worry though, we won&apos;t share this with anyone else!
            </Text>
          </Box>
          <Input
            value={fullname}
            variant={"flushed"}
            onChange={({ currentTarget }) => setFullname(currentTarget.value)}
            focusBorderColor={useColorModeValue("black", "white")}
          />

          <Button
            isDisabled={fullname.trim().length === 0}
            onClick={() => {
              if (fullname.trim().length > 0) setIndex(2);
            }}
            gap={4}
          >
            Continue
            <Kbd>
              <MdKeyboardReturn color={useColorModeValue("black", "white")} />
            </Kbd>
          </Button>
        </VStack>
      </Flex>
    </Center>,
    <Center h={"full"} mr={[12, null, null, 0]}>
      <Flex>
        <Box mr={2}>
          <Flex gap={1} mt={1} align={"center"}>
            <Text fontSize={20}>2</Text>
            <MdArrowRightAlt size={18} />
          </Flex>
        </Box>
        <VStack gap={4} align={"start"}>
          <Box>
            <Heading>How should others address you?</Heading>
            <Text color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}>
              Your username. This will be displayed to other users.
            </Text>
          </Box>
          <Input
            value={username}
            variant={"flushed"}
            onChange={({ currentTarget }) => setUsername(currentTarget.value)}
            focusBorderColor={useColorModeValue("black", "white")}
          />

          <Button
            isDisabled={username.trim().length === 0 || loading}
            isLoading={loading}
            onClick={() => {
              if (username.trim().length > 0) handleSubmit();
            }}
            gap={4}
          >
            Submit
            <Kbd>
              <MdKeyboardReturn />
            </Kbd>
          </Button>
        </VStack>
      </Flex>
    </Center>,
    <Center h={"full"} mr={[12, null, null, 0]}>
      <Box>
        <Heading>Nice — we are done!</Heading>

        <Button mt={4} onClick={() => setIndex(1)} gap={4}>
          Back to home
          <Kbd display={{ base: "none", lg: "unset" }}>
            <MdKeyboardReturn />
          </Kbd>
        </Button>
      </Box>
    </Center>,
  ];

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      switch (pageIndex) {
        case 0:
          if (e.key === "Enter") setIndex(1);
          break;
        case 1:
          if (e.key === "Enter" && fullname.trim().length > 0) setIndex(2);
          break;
        case 2:
          if (e.key === "Enter" && username.trim().length > 0) handleSubmit();
          break;
        case 3:
          if (e.key === "Enter") handleFinish();
          break;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [pageIndex, fullname, username]);

  const handleSubmit = async () => {
    setLoading(true);
    const fData = {
      fullname: fullname.trim(),
      username: username.trim(),
    };

    setDoc(doc(fs, "users", user!.uid), fData, { merge: true }).then(() => {
      setLoading(false);
      setIndex(3);
    });
  };

  const handleFinish = () => {
    getDoc(doc(fs, "users", user!.uid)).then((doc) => {
      dispatch({ type: "SET_DATA", payload: { data: { ...data, ...doc.data() } as UserData } });
    });
  };
  return (
    <DetailLayout
      title="Details"
      description="Welcome to Mercury, now let's get some details about you."
    >
      <Flex minH={"100vh"} gap={4}>
        <Box flex={{ base: 0, lg: 3.5 }} pos={"relative"} filter={"blur(6px)"}>
          <Image
            priority
            layout={"fill"}
            objectFit={"cover"}
            src="https://res.cloudinary.com/dodf3fmwt/image/upload/v1643377366/samples/landscapes/girl-urban-view.jpg"
          />
        </Box>
        <Box flex={{ base: 1, lg: 6.5 }} h={"100vh"} overflow={"hidden"} pos={"relative"}>
          {prompts.map((prompt, index) => {
            if (index == pageIndex || index == pageIndex - 1 || index == pageIndex + 1) {
              return (
                <Box
                  pos={"absolute"}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  transition={"0.8s ease"}
                  transform={`translateY(${(index - pageIndex) * 100}vh)`}
                  key={index}
                >
                  {prompt}
                </Box>
              );
            }
            return <Fragment key={index} />;
          })}
          <Box pos={"absolute"} bottom={4} right={4}>
            <ButtonGroup isAttached>
              <IconButton
                aria-label="Decrement question index"
                onClick={() => setIndex(pageIndex > 0 ? pageIndex - 1 : pageIndex)}
                icon={<TbChevronUp />}
              />
              <IconButton
                aria-label="Increment question index"
                onClick={() => setIndex(pageIndex < prompts.length - 1 ? pageIndex + 1 : pageIndex)}
                icon={<TbChevronDown />}
              />
            </ButtonGroup>
          </Box>
        </Box>
      </Flex>
    </DetailLayout>
  );
};

export default AccountSignUpDetails;
