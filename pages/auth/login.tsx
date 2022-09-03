import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AuthHeader, FormContainer } from "@components";
import { AuthLayout } from "@layouts";
import { auth, AuthErrorResponse } from "@utils/firebase";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import * as Yup from "yup";

interface LoginData {
  email: string;
  password: string;
  stay: boolean;
}

const Login: NextPage = () => {
  const toast = useToast();
  const router = useRouter();
  const [showPW, setShowPW] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: LoginData) => {
    setLoading(true);
    const fData = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    signInWithEmailAndPassword(auth, fData.email, fData.password)
      .then(({ user }) => {
        setLoading(false);
        if (!toast.isActive("login-success")) {
          toast({
            id: "login-success",
            title: "Login Success",
            description: `Welcome back to Mercury`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch(({ code }) => {
        let eMessage;
        setLoading(false);

        switch (code) {
          case AuthErrorCodes.CREDENTIAL_ALREADY_IN_USE:
            eMessage = AuthErrorResponse.CredentialAlreadyInUse;
            break;
          case AuthErrorCodes.USER_DISABLED:
            eMessage = AuthErrorResponse.UserDisabled;
            break;
          default:
            eMessage = AuthErrorResponse.Default;
            break;
        }

        if (!toast.isActive("login-fail")) {
          toast({
            id: "login-fail",
            title: "Login Failed",
            description: eMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      });
  };

  return (
    <AuthLayout
      title="Login"
      description="Login to your account with Mercury. We support integrations with Google, Github or Email to upload, save and like blog posts for free!"
    >
      <VStack px={6} py={12} gap={6} minH={"100vh"} justifyContent={"center"}>
        <AuthHeader heading="Sign in to Mercury" />
        <FormContainer>
          <Formik
            initialValues={{
              email: "",
              password: "",
              stay: false,
            }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form autoComplete={"off"}>
                <Stack gap={6}>
                  <FormControl m={"0 !important"} isInvalid={touched.email && !!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name={"email"}
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl m={"0 !important"} isInvalid={touched.password && !!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name={"password"}
                        onBlur={handleBlur}
                        variant={"outline"}
                        value={values.password}
                        onChange={handleChange}
                        autoComplete={"password"}
                        type={showPW ? "text" : "password"}
                      />
                      <InputRightElement>
                        <IconButton
                          size={"sm"}
                          variant={"ghost"}
                          onClick={() => setShowPW(!showPW)}
                          aria-label={"toggle password visibility"}
                        >
                          {showPW ? <ViewIcon /> : <ViewOffIcon />}
                        </IconButton>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  <Stack
                    align={"start"}
                    justify={"space-between"}
                    direction={{
                      base: "column",
                      sm: "row",
                    }}
                  >
                    <Checkbox name={"stay"} colorScheme={"purple"} onChange={handleChange}>
                      Remember me
                    </Checkbox>
                    <chakra.span color={"purple.400"}>Forgot password?</chakra.span>
                  </Stack>
                  <Button
                    type={"submit"}
                    disabled={isLoading}
                    isLoading={isLoading}
                    colorScheme={"purple"}
                  >
                    {isLoading ? "Attempting to sign you in" : "Sign in"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </FormContainer>
        <Text align={"center"}>
          No account?{" "}
          <NextLink href={"/register"} passHref>
            <Link color={"purple.400"}>Create one now!</Link>
          </NextLink>
        </Text>
      </VStack>
    </AuthLayout>
  );
};

const LoginSchema = Yup.object({
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  password: Yup.string().min(8, "Password is invalid.").required("Password is required."),
});

export default Login;
