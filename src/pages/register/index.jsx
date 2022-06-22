import React, { useContext } from "react";
import {
  Grid,
  Card,
  InputLabel,
  Input,
  Typography,
  useTheme,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import Link from "next/link";
import useRedirectLogged from "../../hooks/useRedirectLogged";
import UserContext from "../../context/user";

const RegisterPage = () => {
  useRedirectLogged();

  const theme = useTheme();
  const router = useRouter();
  const { setState: setUserState } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: "",
      phone: "",
      role: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Campo obrigatório"),
      email: yup.string().email("Email invalido").required("Campo obrigatório"),
      password: yup
        .string()
        .required("Campo obrigatório")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          `A senha deve ter pelo menos 8 caracteres,
                    uma letra maiúscula, uma minuscula,
                    um número e um caractere especial`
        ),
      confirmPassword: yup
        .string()
        .required("Campo obrigatório")
        .oneOf([yup.ref("password"), null], "As senhas não coincidem"),
      birthday: yup
        .string()
        .matches(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
          "Data inválida"
        )
        .optional(),
      phone: yup
        .string()
        .optional()
        .matches(
          /^\d{2}\s\d{4,5}-\d{4}$/,
          "Formato do telefone inválido. Ex: 00 00000-0000"
        ),
      role: yup.string().required("Campo obrigatório"),
    }),
    onSubmit: async (values) => {
      const response = await fetch(`${process.env.API_URL}/user`, {
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
      <Card className={styles.cardRegister}>
        <form onSubmit={formik.handleSubmit}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="stretch"
          >
            <Grid item marginBottom={3}>
              <InputLabel htmlFor="name">Nome</InputLabel>
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                fullWidth
              />
              {formik.touched.name && formik.errors.name ? (
                <Typography color={theme.palette.error.main}>
                  {formik.errors.name}
                </Typography>
              ) : null}
            </Grid>

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
                placeholder="Digite sua melhor senha"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                fullWidth
              />
              {formik.touched.password && formik.errors.password ? (
                <Typography
                  whiteSpace="pre-line"
                  color={theme.palette.error.main}
                >
                  {formik.errors.password}
                </Typography>
              ) : null}
            </Grid>

            <Grid item marginBottom={3}>
              <InputLabel htmlFor="confirmPassword">Confirmar Senha</InputLabel>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Repita sua senha"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                fullWidth
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <Typography
                  whiteSpace="pre-line"
                  color={theme.palette.error.main}
                >
                  {formik.errors.confirmPassword}
                </Typography>
              ) : null}
            </Grid>

            <Grid item marginBottom={3}>
              <InputLabel htmlFor="role">Você é um?</InputLabel>
              <Select
                id="role"
                name="role"
                type="text"
                onChange={formik.handleChange}
                onBlur={(event) => {
                  formik.setTouched({ role: true });
                  formik.handleBlur(event);
                }}
                value={formik.values.role}
                fullWidth
                variant="outlined"
              >
                <MenuItem value={"responsible"}>
                  Responsável de um aluno
                </MenuItem>
                <MenuItem value={"teacher"}>Professor</MenuItem>
              </Select>
              {formik.touched.role && formik.errors.role ? (
                <Typography color={theme.palette.error.main}>
                  {formik.errors.role}
                </Typography>
              ) : null}
            </Grid>

            <Grid item marginBottom={3}>
              <InputLabel htmlFor="phone">Telefone</InputLabel>
              <Input
                id="phone"
                type="text"
                placeholder="00 00000-0000"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                fullWidth
                inputProps={{ maxLength: 13 }}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Typography
                  whiteSpace="pre-line"
                  color={theme.palette.error.main}
                >
                  {formik.errors.phone}
                </Typography>
              ) : null}
            </Grid>

            <Grid item marginBottom={3}>
              <InputLabel htmlFor="birthday">Data de Nascimento</InputLabel>
              <Input
                id="birthday"
                type="text"
                placeholder="DD/MM/AAAA"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthday}
                fullWidth
                inputProps={{ maxLength: 10 }}
              />
              {formik.touched.birthday && formik.errors.birthday ? (
                <Typography
                  whiteSpace="pre-line"
                  color={theme.palette.error.main}
                >
                  {formik.errors.birthday}
                </Typography>
              ) : null}
            </Grid>

            <Grid item margin={2} display="flex" justifyContent="space-between">
              <Grid item>
                <Link href="/login">
                  <Button color="secondary">Ir para o Login</Button>
                </Link>
              </Grid>

              <Grid item>
                <Button type="submit" color="secondary">
                  Criar Conta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Card>
    </Grid>
  );
};

export default RegisterPage;
