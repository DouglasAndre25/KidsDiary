import React from "react";

import { UserProvider } from "./user";

const GlobalContext = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default GlobalContext;
