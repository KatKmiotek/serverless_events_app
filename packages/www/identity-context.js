import React, {createContext, useEffect } from "react";
import netlifyIdentity from "netlify-identity-widget";

const UserContext = createContext({})

const IdentityProvider = ({children}) => {
  const [user, setUser] = React.useState();

  useEffect(() => {
    netlifyIdentity.init({});
  });
  netlifyIdentity.on("login", (user) => {
    netlifyIdentity.close();
    setUser(user);
  });
  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser();
  });

  return (
    <UserContext.Provider value={{ identity: netlifyIdentity, user: user }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, IdentityProvider}