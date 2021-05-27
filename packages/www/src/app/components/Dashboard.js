import React, { useContext } from "react";
import {
  Container,
  Flex,
  NavLink,
} from "theme-ui";
import { Link } from "@reach/router";
import { UserContext } from "../../../identity-context";
import Events from "./Events";
import NewEvent from './NewEvent'

// const ADD_TODO = gql`
//   mutation AddTodo($text: String!) {
//     addTodo(text: $text) {
//       id
//     }
//   }
// `;

// const UPDATE_TODO_DONE = gql`
//   mutation UpdateTodoDone($id: ID!) {
//     updateTodoDone(id: $id) {
//       text
//       done
//     }
//   }
// `;

// const GET_TODOS = gql`
//   query GetTodos {
//     todos {
//       id
//       text
//       done
//     }
//   }
// `;

// const todosReducer = (state, action) => {
//   switch (action.type) {
//     case "addTodo":
//       return [{ done: false, value: action.payload }, ...state];
//     case "toggleTodoDone":
//       const newState = [...state];
//       newState[action.payload] = {
//         done: !state[action.payload].done,
//         value: state[action.payload].value
//       };
//       return newState;
//   }
// };

export default () => {
  const { user, identity: netlifyIdentity } = useContext(UserContext);
//   const [todos, dispatch] = useReducer(todosReducer, []);
//   const [addTodo] = useMutation(ADD_TODO);
//   const [updateTodoDone] = useMutation(UPDATE_TODO_DONE);
//   const { loading, error, data, refetch } = useQuery(GET_TODOS);
  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          List of Events
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
      <Events/>
      <NewEvent/>

    </Container>
  );
};