import { Button, Text } from "@chakra-ui/react";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButton: FC = () => {
  return (
    <Button
      w={"sm"}
      bg={"white"}
      color={"black"}
      _hover={{ bg: "#fafafa" }}
      _active={{
        bg: "#fafafa",
        transform: "scale(0.98)",
      }}
      leftIcon={<FcGoogle />}
    >
      <Text fontWeight={500}>Log in with Google</Text>
    </Button>
  );
};

export default GoogleButton;
