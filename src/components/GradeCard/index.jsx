import React from "react";
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
import styles from "./styles.module.scss";

const GradeCard = ({ grade }) => {
  return (
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
            <IconButton>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton>
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
        <Box display="flex" pl={1}>
          <Button variant="outlined" color="secondary" size="small">
            Novo planejamento de aula
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default GradeCard;
