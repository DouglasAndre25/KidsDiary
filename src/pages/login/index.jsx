import React, { useContext } from "react";
import {
  Button,
  Card,
  Grid,
  Input,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import styles from "./styles.module.scss";
import { useFormik } from "formik";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import useRedirectLogged from "../../hooks/useRedirectLogged";
import UserContext from "../../context/user";

const LoginPage = () => {
  useRedirectLogged();

  const theme = useTheme();
  const router = useRouter();
  const { setState: setUserState } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("O campo é obrigatório."),
      password: yup.string().required("O campo é obrigatório."),
    }),
    onSubmit: async (values) => {
      const response = await fetch(`${process.env.API_URL}/user/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((data) => data.json());

      if (!response.error) {
        setUserState({
          ...response.data,
        });
        router.push("/");
      }
    },
  });

  return (
    <Grid display="flex" justifyContent="center" alignItems="center">
      <Card className={styles.cardLogin}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item marginBottom={3}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email"
                type="text"
                placeholder="Digite seu email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                fullWidth
              />
              {formik.touched.email && formik.errors.email ? (
                <Typography color={theme.palette.error.main}>
                  {formik.errors.email}
                </Typography>
              ) : null}
            </Grid>

            <Grid item marginBottom={3}>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                fullWidth
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography color={theme.palette.error.main}>
                  {formik.errors.password}
                </Typography>
              ) : null}
            </Grid>

            <Grid item>
              <Button type="submit" color="secondary">
                Login
              </Button>
            </Grid>

            <Grid item>
              <Link href="/register">
                <Button color="secondary">Criar Conta</Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};

export default LoginPage;
