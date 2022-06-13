import { useEffect } from "react";
import { useRouter } from "next/router";

const useRedirectAnonymous = () => {
  const router = useRouter();

  useEffect(() => {
    const userData = window.sessionStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    }
  }, [typeof window !== "undefined" && sessionStorage.getItem("user")]);
};

export default useRedirectAnonymous;
