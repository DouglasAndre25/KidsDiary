import React, { useContext } from "react";
import { useFormik } from "formik";
import {
  Button,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import * as yup from "yup";
import UserContext from "../../../context/user";

const StudentForm = ({ responsibles, onClose, setStudents }) => {
  const theme = useTheme();
  const { state: userData } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      registration_number: "",
      responsible_id: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Campo obrigatório"),
      birthday: yup
        .string()
        .matches(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
          "Data inválida"
        )
        .optional(),
      registration_number: yup.number().required("Campo obrigatório"),
      responsible_id: yup.number().required("Campo Obrigatório"),
    }),
    onSubmit: async (values) => {
      const response = await fetch(`${process.env.API_URL}/student`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(values),
      }).then((data) => data.json());
      if (!response.error) {
        setStudents();
        onClose();
      }
    },
  });

  return (
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
            <Typography whiteSpace="pre-line" color={theme.palette.error.main}>
              {formik.errors.birthday}
            </Typography>
          ) : null}
        </Grid>

        <Grid item marginBottom={3}>
          <InputLabel htmlFor="registration_number">
            Número do Registro Escolar
          </InputLabel>
          <Input
            id="registration_number"
            type="number"
            placeholder="123456"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.registration_number}
            fullWidth
          />
          {formik.touched.registration_number &&
          formik.errors.registration_number ? (
            <Typography color={theme.palette.error.main}>
              {formik.errors.registration_number}
            </Typography>
          ) : null}
        </Grid>

        <Grid item marginBottom={3}>
          <InputLabel htmlFor="responsible_id">Responsável do Aluno</InputLabel>
          <Select
            id="responsible_id"
            name="responsible_id"
            onChange={formik.handleChange}
            onBlur={(event) => {
              formik.setTouched({ responsible_id: true });
              formik.handleBlur(event);
            }}
            value={formik.values.responsible_id}
            fullWidth
            variant="outlined"
          >
            {responsibles.map((responsible) => (
              <MenuItem
                value={responsible.id}
                key={`responsible-${responsible.id}`}
              >
                {responsible.people?.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.responsible_id && formik.errors.responsible_id ? (
            <Typography color={theme.palette.error.main}>
              {formik.errors.responsible_id}
            </Typography>
          ) : null}
        </Grid>

        <Grid item display="flex" justifyContent="space-between">
          <Button color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button color="secondary" type="submit">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default StudentForm;
