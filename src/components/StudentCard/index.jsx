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

const StudentCard = ({ student, setGradeCount, isResponsible }) => {
  const [openContent, setOpenContent] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);
  const [deleteEvent, setDeleteEvent] = useState(false);
  const [eventType, setEventType] = useState("");

  const { state: userData } = useContext(UserContext);

  const eventTypes = {
    daily_info: {
      label: "Info para o responsável",
      color: "lightsalmon",
    },
    justification: {
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

  const handleDeleteEvent = (eventId) => {
    fetch(`${process.env.API_URL}/event/${eventId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    }).then(() => {
      setDeleteEvent(false);
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
            {student.name} {isResponsible && `- ${student.Classes[0]?.name}`}
          </Typography>
          <IconButton onClick={() => setOpenContent((open) => !open)}>
            <KeyboardArrowDownIcon fontSize="large" />
          </IconButton>
        </Grid>

        {openContent && (
          <Grid container display="flex" flexDirection="column">
            {student.events.map((event) => (
              <Grid item key={`event-${event.id}`} marginBottom={3}>
                <Grid
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color={eventTypes[event.type].color}>
                    {eventTypes[event.type].label}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      setDeleteEvent(true);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
                <Typography variant="caption">
                  {formatDate(new Date(event.occurrence_date))}
                </Typography>
                <Typography>Mensagem: {event.description}</Typography>
                <hr />

                <CustomModal
                  title={`Excluir a anotação desse aluno?`}
                  open={deleteEvent}
                  onClose={() => setDeleteEvent(false)}
                  content={
                    <Grid display="flex" justifyContent="space-between">
                      <Button
                        color="secondary"
                        onClick={() => setDeleteEvent(false)}
                      >
                        Cancelar
                      </Button>
                      <Button
                        color="secondary"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Excluir
                      </Button>
                    </Grid>
                  }
                />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
      {openContent && (
        <CardActions className={styles.cardActions}>
          {!isResponsible ? (
            <Button
              onClick={() => setOpenEvent(true)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Adicionar Registro
            </Button>
          ) : (
            <>
              <Button
                onClick={() => {
                  setOpenEvent(true);
                  setEventType("report");
                }}
                variant="outlined"
                color="secondary"
                size="small"
              >
                Adicionar aviso
              </Button>
              <Button
                onClick={() => {
                  setOpenEvent(true);
                  setEventType("justification");
                }}
                variant="outlined"
                color="secondary"
                size="small"
              >
                Justificar falta
              </Button>
            </>
          )}
          {!isResponsible && (
            <IconButton
              onClick={() => {
                setDeleteStudent(true);
              }}
            >
              <DeleteIcon fontSize="medium" />
            </IconButton>
          )}
        </CardActions>
      )}

      <CustomModal
        title={`Adicionar ${
          eventType === "justification" ? "Justificativa de falta" : "Registro"
        }`}
        open={openEvent}
        onClose={() => setOpenEvent(false)}
        content={
          <EventForm
            studentId={student.id}
            student={student}
            isTeacher={userData.role === "teacher"}
            eventType={eventType}
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
