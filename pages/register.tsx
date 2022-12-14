import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Flex,
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
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { AuthHeader, FormContainer, GithubButton, GoogleButton } from "@components";
import { AuthLayout } from "@layouts";
import { auth, AuthErrorResponse, fs } from "@utils/firebase";
import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { default as NextLink } from "next/link";
import { useState } from "react";
import * as Yup from "yup";
interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: NextPage = () => {
  const toast = useToast();
  const [showPW, setShowPW] = useState(false);
  const [showCPW, setShowCPW] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (values: RegisterData) => {
    setLoading(true);
    const fData = {
      email: values.email.trim(),
      password: values.password.trim(),
    };
    createUserWithEmailAndPassword(auth, fData.email, fData.password)
      .then(({ user }) => {
        setLoading(false);

        setDoc(doc(fs, "users", user.uid), {
          createdAt: Timestamp.now(),
        });

        if (!toast.isActive("reg-success")) {
          toast({
            id: "reg-success",
            title: "Registration Success",
            description: "Welcome to Mercury.",
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
          case AuthErrorCodes.EMAIL_EXISTS:
            eMessage = AuthErrorResponse.EmailExists;
            break;
          case AuthErrorCodes.USER_DISABLED:
            eMessage = AuthErrorResponse.UserDisabled;
            break;
          default:
            eMessage = AuthErrorResponse.Default;
            break;
        }

        if (!toast.isActive("reg-fail")) {
          toast({
            id: "reg-fail",
            title: "Registration Failed",
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
      title="Register"
      description="Register for an account with Mercury. We support integrations with Google, Github or Email to upload, save and like blog posts for free!"
    >
      <VStack px={6} py={12} gap={6} minH={"100vh"} justifyContent={"center"}>
        <AuthHeader heading="Sign up with Mercury" />
        <FormContainer>
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Stack gap={6}>
                  <FormControl m={"0 !important"} isInvalid={touched.email && !!errors.email}>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name={"email"}
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      autoComplete={"new-email"}
                    />
                    <FormErrorMessage>{errors.email}</FormErrorMessage>
                  </FormControl>
                  <FormControl m={"0 !important"} isInvalid={touched.password && !!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name={"password"}
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        autoComplete={"new-password"}
                        type={showPW ? "text" : "password"}
                      />
                      <InputRightElement>
                        <IconButton
                          size={"sm"}
                          variant={"ghost"}
                          onClick={() => setShowPW(!showPW)}
                          aria-label={"Toggle password visibility"}
                        >
                          {showPW ? <ViewIcon /> : <ViewOffIcon />}
                        </IconButton>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage wordBreak={"break-word"} overflowWrap={"break-word"}>
                      {errors.password}
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl
                    m={"0 !important"}
                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <InputGroup>
                      <Input
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name={"confirmPassword"}
                        autoComplete={"new-password"}
                        value={values.confirmPassword}
                        type={showCPW ? "text" : "password"}
                      />
                      <InputRightElement>
                        <IconButton
                          size={"sm"}
                          variant={"ghost"}
                          onClick={() => setShowCPW(!showCPW)}
                          aria-label={"Toggle confirm password visibility"}
                        >
                          {showCPW ? <ViewIcon /> : <ViewOffIcon />}
                        </IconButton>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                  </FormControl>
                  <Button type={"submit"} disabled={isLoading} isLoading={isLoading}>
                    {isLoading ? "Attempting to register an account" : "Register now!"}
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </FormContainer>
        <Text align="center">
          Already have an account?{" "}
          <NextLink href={"/login"} passHref>
            <Link color={"purple.400"}>Log in now!</Link>
          </NextLink>
        </Text>
        <VStack gap={2}>
          <Flex w={"sm"} align={"center"} gap={2}>
            <Divider borderColor={useColorModeValue("blackAlpha.400", "whiteAlpha.400")} />
            <Text>Or</Text>
            <Divider borderColor={useColorModeValue("blackAlpha.400", "whiteAlpha.400")} />
          </Flex>
          <GithubButton text={"Register with Github"} />
          <GoogleButton text={"Register with Google"} />
        </VStack>
      </VStack>
    </AuthLayout>
  );
};

const RegisterSchema = Yup.object({
  username: Yup.string().max(48, "Must be 48 characters or less"),
  email: Yup.string().email("Please enter a valid email.").required("Email is required."),
  password: Yup.string()
    .min(8, "Password has to be longer than 8 characters.")
    .matches(
      RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number."
    )
    .required("Password is required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password."),
});

export default Register;
