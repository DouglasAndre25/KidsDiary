import React, { useState } from "react";
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

const StudentCard = ({ student, classId }) => {
  const [openContent, setOpenContent] = useState(false);
  const [openEvent, setOpenEvent] = useState(false);

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
          <>
            <Grid>Espaço Reservado pros eventos</Grid>
          </>
        )}
      </CardContent>
      {openContent && (
        <CardActions>
          <Grid display="flex" justifyContent="space-around">
            <Button
              onClick={() => setOpenEvent(true)}
              variant="outlined"
              color="secondary"
              size="small"
            >
              Adicionar Registro
            </Button>
          </Grid>
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
          />
        }
      />
    </Card>
  );
};

export default StudentCard;
