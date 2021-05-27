import React from "react"
import { ThemeProvider } from "theme-ui";
import { deep } from "@theme-ui/presets";
import { IdentityProvider } from "./identity-context";

const tokens = {
  ...deep,
  sizes: { container: 1024 }
};

export const wrapRootElement = ({ element }) => (
  <IdentityProvider>
    <ThemeProvider theme={tokens}>{element}</ThemeProvider>
  </IdentityProvider>
);