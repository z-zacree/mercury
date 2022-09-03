import { Heading, Stack, Text, Link } from "@chakra-ui/react";
import { FC } from "react";

const AuthHeader: FC<{ heading: string }> = ({ heading }) => {
  return (
    <Stack align={{ base: "left", sm: "center" }} maxW={"lg"}>
      <Heading fontSize={"4xl"} lineHeight={1}>
        {heading}
      </Heading>
      <Text fontSize={"lg"} color={"gray.500"}>
        to enjoy all of our cool <Link color={"purple.400"}>Features</Link>
        ✌️
      </Text>
    </Stack>
  );
};

export default AuthHeader;
