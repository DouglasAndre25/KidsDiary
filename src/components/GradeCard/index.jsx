import React, { useContext, useState } from "react";
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
import Modal from "../Modal";
import styles from "./styles.module.scss";
import UserContext from "../../context/user";

const GradeCard = ({ grade, students = [], setClassesCount }) => {
  const [editClassForm, setEditClassForm] = useState(false);
  const [deleteClass, setDeleteClass] = useState(false);

  const { state: userData } = useContext(UserContext);

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
            <Typography gutterBottom variant="h5" component="h2">
              {grade.name}
            </Typography>

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
            <Button variant="outlined" color="secondary" size="small">
              Novo planejamento de aula
            </Button>
            <Button variant="outlined" color="secondary" size="small">
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
    </>
  );
};

export default GradeCard;
