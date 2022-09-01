import { Box, useColorModeValue } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      p={8}
      w={"full"}
      maxW={"sm"}
      rounded={"lg"}
      boxShadow={"lg"}
      bg={useColorModeValue("white", "blackAlpha.700")}
    >
      {children}
    </Box>
  );
};

export default FormContainer;
