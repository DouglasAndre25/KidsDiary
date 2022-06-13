import React from "react";
import useRedirectAnonymous from "../hooks/useRedirectAnonymous";

const Home = () => {
  useRedirectAnonymous();
  return <h1>Home</h1>;
};

export default Home;
