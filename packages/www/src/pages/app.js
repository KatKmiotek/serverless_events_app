import React, { useContext, useEffect } from "react";
import { navigate } from "gatsby";
import { Container, Flex, Button } from "theme-ui";
import { UserContext } from "../../identity-context"

export default () => {
  const { user, netlifyIdentity } = useContext(UserContext);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });
  return (
    <Container>
      {user && (
        <>
          <Flex sx={{ alignItems: "center" }}>
            <h1 style={{ marginRight: "2rem" }}>
              Hello, {user?.user_metadata?.full_name}
            </h1>
            <Button
              onClick={() => {
                netlifyIdentity.logout();
                navigate("/");
              }}
            >
              Log Out
            </Button>
          </Flex>
          {/* <Todo /> */}
        </>
      )}
    </Container>
  );
  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //     return null;
  //   }
  // });
};
