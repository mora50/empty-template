import { ApolloProvider } from "@apollo/client";

import { AppProps } from "next/dist/next-server/lib/router/router";

import "../styles/tailwind.css";
import GlobalStyle from "@styles/global";
import { ThemeProvider } from "styled-components";

import { FC } from "react";
import theme from "@styles/theme";
import ProtectRoute, { AuthProvider } from "../contexts/authContext";

import "react-toastify/dist/ReactToastify.css";
import "react-credit-cards/es/styles-compiled.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from "react-toastify";
import client from "@services/apollo";
import { LocationProvider } from "src/contexts/locationContext";

const Noop: FC = ({ children }) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  const SideBarProfile = (Component as any).SideBarProfile || Noop;

  return (
    <>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ToastContainer />
          <AuthProvider>
            <LocationProvider>
              <ProtectRoute>
                <Layout pageProps={pageProps}>
                  <SideBarProfile>
                    <Component {...pageProps} />
                  </SideBarProfile>
                </Layout>
              </ProtectRoute>
            </LocationProvider>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}
