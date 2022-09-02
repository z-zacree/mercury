import {
  ChakraProvider,
  extendTheme,
  StyleFunctionProps,
  theme as ChakraTheme,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import AuthProvider from "@utils/context/AuthProvider";
import type { AppProps } from "next/app";
import { FC } from "react";

if (typeof window !== "undefined") {
  const colorMode = localStorage.getItem("chakra-ui-color-mode");

  if (colorMode == null) {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    localStorage.setItem("chakra-ui-color-mode", prefersDarkMode ? "dark" : "light");
  }
}

const customTheme = extendTheme({
  ...ChakraTheme,
  fonts: {
    heading: `Montserrat, ${ChakraTheme.fonts.heading}`,
    body: `Inter, ${ChakraTheme.fonts.body}`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      html: {
        scrollBehavior: "smooth",
        overflowY: "overlay",
      },
      "::-webkit-scrollbar": {
        w: "6px",
      },
      "::-webkit-scrollbar-thumb": {
        borderRadius: "6px",
        borderRight: "6px solid transparent",
        bgColor: "rgba(0, 0, 0, 0.2)",
        "&:hover": {
          bgColor: "rgba(0, 0, 0, 0.4)",
        },
      },
      "input:-webkit-autofill": {
        transition: "background-color 600000s",
      },
      body: {
        m: 0,
        p: 0,
        minWidth: "100vw",
        minHeight: "100vh",
        background: mode("#EAF6FF", "#232528")(props),
      },
    }),
  },
});

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
