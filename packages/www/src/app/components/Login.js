import React from "react";
import { Container, Heading, Button } from "theme-ui";
import netlifyIdentity from 'netlify-identity-widget'

const Login = ({ identity }) => {
  return (
    <Container p={4} sx={{ textAlign: "center" }}>
      <Heading as="h1" sx={{ fontSize: "72px" }}>
        Testing Events
      </Heading>
      <Button
        sx={{ marginTop: 2 }}
        onClick={() => {
          netlifyIdentity.open();
        }}
      >
        Log In / Register
      </Button>
    </Container>
  );
};

export default Login;
