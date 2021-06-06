import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "apollo-link-context";
import fetch from "node-fetch";
import netlifyIdentity from "netlify-identity-widget";

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser();
  const token = user.token.access_token;
  // return the headers to the context so httplink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const httpLink = new HttpLink({
  uri: "https://events-app-gatsby.netlify.app/.netlify/functions/graphql",
  fetch,
});

export const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  link: httpLink,
});