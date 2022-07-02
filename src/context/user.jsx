import React, { createContext, useEffect, useState } from "react";

const defaultValues = {
  state: null,
  setState: () => {},
};

const UserContext = createContext(defaultValues);

const UserProvider = ({ children }) => {
  const [state, setState] = useState(defaultValues.state);

  useEffect(() => {
    const stateData = JSON.parse(sessionStorage.getItem("user"));

    if (stateData) {
      setState(stateData);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(state));
  }, [state]);

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
