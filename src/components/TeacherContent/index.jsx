import React, { useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import styles from "./styles.module.scss";
import StudentForm from "../Forms/StudentForm";
import ClassForm from "../Forms/ClassForm";

const TeacherContent = () => {
  const [studentForm, setStudentForm] = useState(false);
  const [classForm, setClassForm] = useState(false);

  return (
    <Grid container className={styles.container}>
      <Grid item mr={0} ml="auto" display="flex" alignItems="flex-start" mt={2}>
        <Box mr={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStudentForm(true)}
          >
            Cadastrar um novo Aluno
          </Button>
        </Box>
        <Box mr={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setClassForm(true)}
          >
            Cadastrar uma nova Turma
          </Button>
        </Box>
      </Grid>

      {studentForm && <StudentForm onClose={() => setStudentForm(false)} />}
      {classForm && <ClassForm onClose={() => setClassForm(false)} />}
    </Grid>
  );
};

export default TeacherContent;
