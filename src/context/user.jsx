import React, { createContext, useState } from "react";

const defaultValues = {
  state: null,
  setState: () => {},
};

const UserContext = createContext(defaultValues);

const UserProvider = ({ children }) => {
  const [state, setState] = useState(defaultValues.state);

  return (
    <UserContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
export default UserContext;
