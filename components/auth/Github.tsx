import { Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IoLogoGithub } from "react-icons/io";

const GithubButton: FC = () => {
  return (
    <Button
      w={"sm"}
      bg={"#333333"}
      color={"white"}
      _hover={{ bg: "black" }}
      _active={{
        bg: "black",
        transform: "scale(0.98)",
      }}
      leftIcon={<IoLogoGithub />}
    >
      <Text fontWeight={500}>Log in with Github</Text>
    </Button>
  );
};

export default GithubButton;
