import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Box } from "@mui/material";
import styles from "./styles.module.scss";
import StudentForm from "../Forms/StudentForm";
import ClassForm from "../Forms/ClassForm";
import Modal from "../Modal";
import UserContext from "../../context/user";

const TeacherContent = () => {
  const [studentForm, setStudentForm] = useState(false);
  const [classForm, setClassForm] = useState(false);
  const [responsibles, setResponsibles] = useState({});

  const { state: userData } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.API_URL}/responsible`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (!response.error) setResponsibles(response.data);
      });
  }, []);

  return (
    <Grid container className={styles.container}>
      <Grid item mr={0} ml="auto" display="flex" alignItems="flex-start" mt={2}>
        <Box mr={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setStudentForm(true)}
          >
            Cadastrar novo Aluno
          </Button>
        </Box>
        <Box mr={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setClassForm(true)}
          >
            Cadastrar nova Turma
          </Button>
        </Box>
      </Grid>
      {studentForm && (
        <Modal
          open={studentForm}
          onClose={() => setStudentForm(false)}
          title="Cadastre um novo Aluno"
          content={
            <StudentForm
              responsibles={responsibles}
              onClose={() => setStudentForm(false)}
            />
          }
        />
      )}
      {classForm && (
        <Modal
          open={classForm}
          onClose={() => setClassForm(false)}
          title="Cadastre uma nova Turma"
          content={<ClassForm />}
        />
      )}
    </Grid>
  );
};

export default TeacherContent;
