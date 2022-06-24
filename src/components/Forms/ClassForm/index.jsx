import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Chip,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import UserContext from "../../../context/user";

const ClassForm = ({ students, onClose, setClasses }) => {
  const theme = useTheme();
  const { state: userData } = useContext(UserContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      students: [],
    },
    validationSchema: yup.object({
      name: yup.string().required("Campo obrigatório"),
      students: yup.array().test({
        message: "Deve ter pelo menos um aluno na turma",
        test: (arr) => arr.length,
      }),
    }),
    onSubmit: async (values) => {
      const response = await fetch(`${process.env.API_URL}/class`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify(values),
      }).then((data) => data.json());
      if (!response.error) {
        setClasses();
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
          <InputLabel htmlFor="students">Alunos da turma</InputLabel>
          <Select
            name="students"
            id="students"
            variant="outlined"
            multiple
            value={formik.values.students}
            fullWidth
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            input={<OutlinedInput id="select-multiple-students" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={
                      students.find((student) => student.id === value).name
                    }
                  />
                ))}
              </Box>
            )}
          >
            {students.map((student) => (
              <MenuItem value={student.id} key={`student-${student.id}`}>
                {student.name}
              </MenuItem>
            ))}
          </Select>
          {formik.touched.students && formik.errors.students ? (
            <Typography color={theme.palette.error.main}>
              {formik.errors.students}
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

export default ClassForm;
