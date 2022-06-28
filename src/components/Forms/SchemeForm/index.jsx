import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Grid,
  Input,
  InputLabel,
  Typography,
  useTheme,
} from "@mui/material";
import UserContext from "../../../context/user";

const SchemeForm = ({ classId, onClose, setSchemesCount }) => {
  const theme = useTheme();
  const { state: userData } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      description: "",
      planning_date: "",
      class_id: classId,
    },
    validationSchema: yup.object({
      description: yup.string().required("Campo requirido"),
      planning_date: yup
        .string()
        .matches(
          /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
          "Data inválida"
        )
        .required("Campo requirido"),
    }),
    onSubmit: (values) => {
      fetch(`${process.env.API_URL}/scheme`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(values),
      })
        .then((data) => data.json())
        .then((data) => {
          if (!data.error) {
            setSchemesCount((count) => count + 1);
            onClose();
          }
        });
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
          <InputLabel htmlFor="description">
            Descrição do planejamento da aula
          </InputLabel>
          <Input
            id="description"
            type="text"
            placeholder="Digite o planejamento"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            fullWidth
            multiline
            rows={4}
          />
          {formik.touched.description && formik.errors.description ? (
            <Typography color={theme.palette.error.main}>
              {formik.errors.description}
            </Typography>
          ) : null}
        </Grid>

        <Grid item marginBottom={3}>
          <InputLabel htmlFor="planning_date">Dia do planejamento</InputLabel>
          <Input
            id="planning_date"
            type="text"
            placeholder="DD/MM/AAAA"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.planning_date}
            fullWidth
            inputProps={{ maxLength: 10 }}
          />
          {formik.touched.planning_date && formik.errors.planning_date ? (
            <Typography whiteSpace="pre-line" color={theme.palette.error.main}>
              {formik.errors.planning_date}
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

export default SchemeForm;
