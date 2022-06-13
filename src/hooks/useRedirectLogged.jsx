import { useEffect } from "react";
import { useRouter } from "next/router";

const useRedirectLogged = () => {
  const router = useRouter();
  useEffect(() => {
    const userData = window.sessionStorage.getItem("user");
    if (userData) {
      router.push("/");
    }
  }, [typeof window !== "undefined" && sessionStorage.getItem("user")]);
};

export default useRedirectLogged;
