import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import StudentCard from "../StudentCard";
import UserContext from "../../context/user";

const ResponsibleContent = () => {
  const [students, setStudents] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const { state: userData } = useContext(UserContext);

  useEffect(() => {
    fetch(
      `${process.env.API_URL}/student?responsibleId=${userData.responsible?.id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      }
    )
      .then((data) => data.json())
      .then((response) => {
        if (!response.error) setStudents(response.data);
      });
  }, [studentsCount]);

  return (
    <Grid display="flex" flexDirection="column" container height="10000000vh">
      <Grid item mt={2} display="flex" justifyContent="space-around">
        <Typography color="primary" variant="h4"></Typography>
      </Grid>

      <Grid item mt={2}>
        {students.map((student) => (
          <>
            {student.Classes.length && (
              <StudentCard
                key={`student-${student.id}`}
                student={student}
                isResponsible
                setGradeCount={setStudentsCount}
              />
            )}
          </>
        ))}
      </Grid>
    </Grid>
  );
};

export default ResponsibleContent;
