import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "../../context/user";
import useRedirectAnonymous from "../../hooks/useRedirectAnonymous";
import { Grid, Typography } from "@mui/material";
import StudentCard from "../../components/StudentCard";

const ClassPage = () => {
  useRedirectAnonymous();

  const [grade, setGrade] = useState({});
  const [gradeCount, setGradeCount] = useState(0);

  const router = useRouter();
  const { id } = router.query;
  const { state: userData } = useContext(UserContext);

  useEffect(() => {
    if (userData && id) {
      fetch(`${process.env.API_URL}/class/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData.token}`,
        },
      })
        .then((data) => data.json())
        .then((response) => {
          if (!response.error) setGrade(response.data);
        });
    }
  }, [id, userData, gradeCount]);

  return (
    <Grid display="flex" flexDirection="column" container height="10000000vh">
      <Grid item mt={2} display="flex" justifyContent="space-around">
        <Typography color="primary" variant="h4">
          {grade.name}
        </Typography>
      </Grid>

      <Grid item mt={2}>
        {grade.students?.map((student) => (
          <StudentCard
            classId={id}
            key={`student-${student.id}`}
            student={student}
            setGradeCount={setGradeCount}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default ClassPage;
