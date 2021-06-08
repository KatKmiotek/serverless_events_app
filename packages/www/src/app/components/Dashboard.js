import React, { useContext } from "react";
import {
  Container,
  Flex,
  NavLink,
} from "theme-ui";
import { Link } from "@reach/router";
import { UserContext } from "../../../identity-context";



export default () => {
  const { user, identity: netlifyIdentity } = useContext(UserContext);
  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/add"} p={2}>
          Add Event
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout();
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
    </Container>
  );
};