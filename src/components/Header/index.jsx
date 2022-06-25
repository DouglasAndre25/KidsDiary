import React, { memo, useContext } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import UserContext from "../../context/user";

import styles from "./styles.module.scss";

const Header = () => {
  const { state: userData, setState } = useContext(UserContext);

  const handleLogout = () => {
    setState(null);
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <a>
          <Typography variant="h4">Kids Diary</Typography>
        </a>
      </Link>
      {userData ? (
        <a onClick={handleLogout}>
          <Typography variant="body1">Sair</Typography>
        </a>
      ) : (
        <Link href="/login">
          <a>
            <Typography variant="body1">Entre ou cadastre-se</Typography>
          </a>
        </Link>
      )}
    </header>
  );
};

export default memo(Header);
