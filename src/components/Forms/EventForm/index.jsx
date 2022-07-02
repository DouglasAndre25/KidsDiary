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

const EventForm = ({
  isTeacher,
  eventType,
  onClose,
  studentId,
  setGradeCount,
  student,
}) => {
  const theme = useTheme();
  const { state: userData } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      description: "",
      type: isTeacher ? "daily_info" : eventType,
      occurrence_date: new Date(),
    },
    validationSchema: yup.object({
      description: yup.string().required("Campo obrigatório"),
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
          teacher_id: isTeacher
            ? Number(userData.id)
            : student.Classes[0]?.teacher_id,
        }),
      })
        .then((data) => data.json())
        .then((response) => {
          if (!response.error) {
            setGradeCount();
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
