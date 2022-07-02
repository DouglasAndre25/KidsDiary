import React, { useContext, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  IconButton,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styles from "./styles.module.scss";
import EventForm from "../Forms/EventForm";
import CustomModal from "../Modal";
import { formatDate } from "../../utils/date";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "../../context/user";

const StudentCard = ({ student, classId, setGradeCount }) => {
  const [openContent, setOpenContent] = useState(true);
  const [openEvent, setOpenEvent] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);

  const { state: userData } = useContext(UserContext);

  const eventTypes = {
    daily_info: {
      label: "Info para o responsável",
      color: "lightsalmon",
    },
    justify: {
      label: "Justificativa de falta",
      color: "darkred",
    },
    report: {
      label: "Info para o professor",
      color: "lightsalmon",
    },
  };

  const handleDeleteStudent = () => {
    fetch(`${process.env.API_URL}/student/${student.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    }).then(() => {
      setGradeCount((count) => count + 1);
    });
  };

  return (
    <Card variant="elevation" className={styles.card}>
      <CardContent>
        <Grid
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Typography gutterBottom variant="h5" component="h2">
            {student.name}
          </Typography>
          <IconButton onClick={() => setOpenContent((open) => !open)}>
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Grid>

        {openContent && (
          <Grid container display="flex" flexDirection="column">
            {student.events.map((event) => (
              <Grid item key={`event-${event.id}`} marginBottom={3}>
                <Typography color={eventTypes[event.type].color}>
                  {eventTypes[event.type].label}
                </Typography>
                <Typography variant="caption">
                  {formatDate(new Date(event.occurrence_date))}
                </Typography>
                <Typography>Mensagem: {event.description}</Typography>
                <hr />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
      {openContent && (
        <CardActions className={styles.cardActions}>
          <Button
            onClick={() => setOpenEvent(true)}
            variant="outlined"
            color="secondary"
            size="small"
          >
            Adicionar Registro
          </Button>
          <IconButton
            onClick={() => {
              setDeleteStudent(true);
            }}
          >
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </CardActions>
      )}

      <CustomModal
        title="Adicionar Registro"
        open={openEvent}
        onClose={() => setOpenEvent(false)}
        content={
          <EventForm
            studentId={student.id}
            classId={classId}
            isTeacher
            onClose={() => setOpenEvent(false)}
            setGradeCount={() => setGradeCount((count) => count + 1)}
          />
        }
      />

      <CustomModal
        title={`Excluir a o Aluno ${student.name} ?
          (Lembrando que será excluído todas as informações do aluno)`}
        open={deleteStudent}
        onClose={() => setDeleteStudent(false)}
        content={
          <Grid display="flex" justifyContent="space-between">
            <Button color="secondary" onClick={() => setDeleteStudent(false)}>
              Cancelar
            </Button>
            <Button color="secondary" onClick={handleDeleteStudent}>
              Excluir
            </Button>
          </Grid>
        }
      />
    </Card>
  );
};

export default StudentCard;
