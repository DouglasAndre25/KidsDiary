import React, { useContext } from "react";
import useRedirectAnonymous from "../hooks/useRedirectAnonymous";
import TeacherContent from "../components/TeacherContent";
import ResponsibleContent from "../components/ResponsibleContent";
import UserContext from "../context/user";

const Home = () => {
  useRedirectAnonymous();
  const { state: user } = useContext(UserContext);

  return user?.role === "teacher" ? (
    <TeacherContent />
  ) : user?.role === "responsible" ? (
    <ResponsibleContent />
  ) : (
    <></>
  );
};

export default Home;
