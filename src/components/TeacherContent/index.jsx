import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Box, Typography } from "@mui/material";
import styles from "./styles.module.scss";
import StudentForm from "../Forms/StudentForm";
import ClassForm from "../Forms/ClassForm";
import Modal from "../Modal";
import UserContext from "../../context/user";
import GradeCard from "../GradeCard";

const TeacherContent = () => {
  const [studentForm, setStudentForm] = useState(false);
  const [classForm, setClassForm] = useState(false);
  const [responsibles, setResponsibles] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [classes, setClasses] = useState([]);
  const [classesCount, setClassesCount] = useState(0);

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

  useEffect(() => {
    fetch(`${process.env.API_URL}/student`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (!response.error) setStudents(response.data);
      });
  }, [studentsCount]);

  useEffect(() => {
    fetch(`${process.env.API_URL}/class`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (!response.error) setClasses(response.data);
      });
  }, [classesCount]);

  return (
    <Grid
      display="flex"
      flexDirection="column"
      container
      className={styles.container}
    >
      <Grid item display="flex" alignItems="flex-start" mt={2}>
        <Box mr={1} ml={1}>
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

      <Grid item mt={6} display="flex" justifyContent="space-around">
        <Typography color="primary" variant="h4">
          Suas Turmas
        </Typography>
      </Grid>

      <Grid item mt={2}>
        {classes.map((grade) => (
          <GradeCard
            key={`grade-${grade.id}`}
            grade={grade}
            students={students}
            setClassesCount={setClassesCount}
          />
        ))}
      </Grid>
      {studentForm && (
        <Modal
          open={studentForm}
          onClose={() => setStudentForm(false)}
          title="Cadastre um novo Aluno"
          content={
            <StudentForm
              responsibles={responsibles}
              setStudents={() => setStudentsCount((count) => count + 1)}
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
          content={
            <ClassForm
              students={students}
              onClose={() => setClassForm(false)}
              setClasses={() => setClassesCount((count) => count + 1)}
            />
          }
        />
      )}
    </Grid>
  );
};

export default TeacherContent;
