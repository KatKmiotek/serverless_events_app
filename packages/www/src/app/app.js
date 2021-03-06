import React, { useContext } from "react";
import { UserContext } from "../../identity-context";
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Login from "./components/Login";

const App = () => {
  const { user, netlifyIdentity } = useContext(UserContext);
  
  if(!user){
  return <Login identity={netlifyIdentity} />
}else 
      return(
        <>
      <Dashboard/>
      <Events/>
      </>
      )

  }


export default App;
