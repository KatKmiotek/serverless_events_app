import React from "react"
import { ThemeProvider } from "theme-ui";
import { deep } from "@theme-ui/presets";
import { IdentityProvider } from "./identity-context";
import { ApolloProvider } from '@apollo/client'
import { client } from './src/apollo/client'

const tokens = {
  ...deep,
  sizes: { container: 1024 }
};
export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
  <IdentityProvider>
    <ThemeProvider theme={tokens}>{element}</ThemeProvider>
  </IdentityProvider>
  </ApolloProvider>
);