import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/user";

const useRedirectLogged = () => {
  const router = useRouter();
  const { state: userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      router.push("/");
    }
  }, [userData]);
};

export default useRedirectLogged;
