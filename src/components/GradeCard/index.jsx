import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CardActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClassForm from "../Forms/ClassForm";
import SchemeForm from "../Forms/SchemeForm";
import Modal from "../Modal";
import styles from "./styles.module.scss";
import UserContext from "../../context/user";
import ViewScheme from "../ViewScheme";
import Link from "next/link";

const GradeCard = ({ grade, students = [], setClassesCount }) => {
  const [editClassForm, setEditClassForm] = useState(false);
  const [schemeForm, setSchemeForm] = useState(false);
  const [viewScheme, setViewScheme] = useState(false);
  const [deleteClass, setDeleteClass] = useState(false);
  const [schemes, setSchemes] = useState([]);
  const [schemesCount, setSchemesCount] = useState(0);

  const { state: userData } = useContext(UserContext);

  useEffect(() => {
    fetch(`${process.env.API_URL}/scheme/class/${grade.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (!response.error) setSchemes(response.data);
      });
  }, [schemesCount]);

  const handleDeleteClass = () => {
    fetch(`${process.env.API_URL}/class/${grade.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    }).then(() => {
      setDeleteClass(false);
      setClassesCount((count) => count + 1);
    });
  };

  return (
    <>
      <Card variant="elevation" className={styles.card}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Link href={`/class/${grade.id}`}>
              <Typography gutterBottom variant="h5" component="h2">
                {grade.name}
              </Typography>
            </Link>

            <Box>
              <IconButton onClick={() => setEditClassForm(true)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => setDeleteClass(true)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            style={{
              wordWrap: "break-word",
            }}
            marginTop={2}
          >
            Alunos: {grade.students.map((student) => student.name).toString()}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box pl={1} display="flex" flexDirection="column">
            <Button
              onClick={() => setSchemeForm(true)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Novo planejamento de aula
            </Button>
            <Button
              onClick={() => setViewScheme(true)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Visualizar planejamentos de aula
            </Button>
          </Box>
        </CardActions>
      </Card>

      <Modal
        title={`Edite a turma ${grade.name}`}
        open={editClassForm}
        onClose={() => setEditClassForm(false)}
        content={
          <ClassForm
            students={students}
            onClose={() => setEditClassForm(false)}
            setClasses={() => setClassesCount((count) => count + 1)}
            defaultValues={{
              id: grade.id,
              name: grade.name,
              students: grade.students.map((student) => student.id),
            }}
          />
        }
      />

      <Modal
        title={`Excluir a turma ${grade.name} ?`}
        open={deleteClass}
        onClose={() => setDeleteClass(false)}
        content={
          <Box display="flex" justifyContent="space-between">
            <Button color="secondary" onClick={() => setDeleteClass(false)}>
              Cancelar
            </Button>
            <Button color="secondary" onClick={handleDeleteClass}>
              Excluir
            </Button>
          </Box>
        }
      />

      <Modal
        title={"Cadastrar novo planejamento"}
        open={schemeForm}
        onClose={() => setSchemeForm(false)}
        content={
          <SchemeForm
            setSchemesCount={setSchemesCount}
            classId={grade.id}
            onClose={() => setSchemeForm(false)}
          />
        }
      />

      <Modal
        title={`Planejamentos da turma ${grade.name}`}
        open={viewScheme}
        onClose={() => setViewScheme(false)}
        content={
          <ViewScheme setSchemesCount={setSchemesCount} schemes={schemes} />
        }
      />
    </>
  );
};

export default GradeCard;
