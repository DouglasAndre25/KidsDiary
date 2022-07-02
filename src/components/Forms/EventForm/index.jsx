import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import UserContext from "../../../context/user";

const EventForm = ({ isTeacher, onClose, studentId }) => {
  const theme = useTheme();
  const { state: userData } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      description: "",
      type: isTeacher ? "daily_info" : "",
      occurrence_date: new Date(),
    },
    validationSchema: yup.object({
      description: yup.string().required("Campo obrigatório"),
      type: yup.string().required("Campo obrigatório"),
    }),
    onSubmit: (values) => {
      fetch(`${process.env.API_URL}/event/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({
          ...values,
          student_id: Number(studentId),
          teacher_id: Number(userData.id),
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          if (!response.error) {
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
            {isTeacher
              ? "Mensagem para o responsável"
              : "Descrição da ocorrência"}
          </InputLabel>
          <Input
            id="description"
            type="text"
            placeholder="..."
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

        {!isTeacher && (
          <Grid item marginBottom={3}>
            <InputLabel htmlFor="type">Tipo da atividade</InputLabel>
            <Select
              id="type"
              name="type"
              type="text"
              onChange={formik.handleChange}
              onBlur={(event) => {
                formik.setTouched({ type: true });
                formik.handleBlur(event);
              }}
              value={formik.values.type}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="justify">Justificativa de falta</MenuItem>
              <MenuItem value="report">Aviso para o professor</MenuItem>
            </Select>
          </Grid>
        )}

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

export default EventForm;
