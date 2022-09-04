import { Button, Text, useToast } from "@chakra-ui/react";
import {
  AuthError,
  AuthErrorCodes,
  fetchSignInMethodsForEmail,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";
import { FC } from "react";
import { IoLogoGithub } from "react-icons/io";
import { auth, AuthErrorResponse, fs } from "@utils/firebase";
import { getDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { UserData } from "../../utils/models";

const GithubButton: FC<{ text: string }> = ({ text }) => {
  const toast = useToast();
  const provider = new GithubAuthProvider();
  const gProvider = new GoogleAuthProvider();

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
            if (!toast.isActive("gitRegistration-success")) {
              toast({
                id: "gitRegistration-success",
                title: "Registration Success",
                description: `Welcome to Mercury`,
                status: "success",
                duration: 3000,
              });
            }
          } else {
            if (!toast.isActive("gitLogin-success")) {
              toast({
                id: "gitLogin-success",
                title: "Login Success",
                description: `Welcome back to Mercury ${userData.username ?? ""}`,
                status: "success",
                duration: 3000,
              });
            }
          }
        });
      })
      .catch(async (err: AuthError) => {
        let eMessage;

        switch (err.code) {
          case AuthErrorCodes.NEED_CONFIRMATION:
            await fetchSignInMethodsForEmail(auth, err.customData.email!).then((methods) => {
              if (methods[0] === "password") {
                if (!toast.isActive("login-fail")) {
                  toast({
                    id: "login-fail",
                    title: "Login Failed",
                    description: "Please login with your password",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              } else {
                signInWithPopup(auth, gProvider)
                  .then(({ user }) => {
                    getDoc(doc(fs, "users", user.uid)).then((snapshot) => {
                      const userData = snapshot.data() as UserData;
                      if (!toast.isActive("gitLogin-success")) {
                        toast({
                          id: "gitLogin-success",
                          title: "Login Success",
                          description: `Welcome back to Mercury ${userData.username ?? ""}`,
                          status: "success",
                          duration: 3000,
                        });
                      }
                    });
                  })
                  .catch(({ code }) => {
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
                  });
              }
            });
            return;
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
      bg={"#333333"}
      color={"white"}
      _hover={{ bg: "black" }}
      _active={{
        bg: "black",
        transform: "scale(0.98)",
      }}
      leftIcon={<IoLogoGithub />}
      onClick={handleClick}
    >
      <Text fontWeight={500}>{text}</Text>
    </Button>
  );
};

export default GithubButton;
