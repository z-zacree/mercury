import { Button, Text, useColorMode, useColorModeValue, useToast } from "@chakra-ui/react";
import { AuthErrorCodes, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, AuthErrorResponse, fs } from "@utils/firebase";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { UserData } from "@utils/models";

const GoogleButton: FC<{ text: string }> = ({ text }) => {
  const toast = useToast();
  const provider = new GoogleAuthProvider();

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const user = res.user;
        await getDoc(doc(fs, "users", user.uid)).then((snapshot) => {
          const userData = snapshot.data() as UserData;
          if (!userData) {
            setDoc(doc(fs, "users", user.uid), {
              createdAt: Timestamp.now(),
            });
            if (!toast.isActive("gRegistration-success")) {
              toast({
                id: "gRegistration-success",
                title: "Registration Success",
                description: `Welcome to Mercury`,
                status: "success",
                duration: 3000,
              });
            }
          } else {
            if (!toast.isActive("gLogin-success")) {
              toast({
                id: "gLogin-success",
                title: "Login Success",
                description: `Welcome back to Mercury ${userData.username ?? ""}`,
                status: "success",
                duration: 3000,
              });
            }
          }
        });
      })
      .catch(({ code }) => {
        let eMessage;

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
    <Button
      w={"sm"}
      bg={"white"}
      color={"black"}
      _hover={{ bg: useColorModeValue("#fafafa", "#f0f0f0") }}
      _active={{
        bg: useColorModeValue("#fafafa", "#f0f0f0"),
        transform: "scale(0.98)",
      }}
      leftIcon={<FcGoogle />}
      onClick={handleClick}
    >
      <Text fontWeight={500}>{text}</Text>
    </Button>
  );
};

export default GoogleButton;
