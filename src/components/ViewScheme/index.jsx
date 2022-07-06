import React, { useContext, useState } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UserContext from "../../context/user";
import CustomModal from "../Modal";

const ViewScheme = ({ schemes, setSchemesCount, isResponsible }) => {
  const { state: userData } = useContext(UserContext);
  const [deleteScheme, setDeleteScheme] = useState(false);

  const handleDeleteScheme = async (schemeId) => {
    fetch(`${process.env.API_URL}/scheme/${schemeId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    })
      .then((data) => data.json())
      .then((response) => {
        if (!response.error) {
          setSchemesCount((count) => count + 1);
          setDeleteScheme(false);
        }
      });
  };

  return schemes.length ? (
    <Grid container padding={0}>
      {schemes.map((scheme) => (
        <Grid
          alignItems="center"
          display="flex"
          key={`scheme-${scheme.id}`}
          margin={2}
        >
          <Grid>
            <Typography>{scheme.description}</Typography>
            <Typography>
              {new Date(scheme.planning_date).toLocaleDateString("pt-BR")}
            </Typography>
          </Grid>

          {!isResponsible && (
            <IconButton
              onClick={() => {
                setDeleteScheme(true);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}

          <CustomModal
            title={`Excluir esse planejamento de aula?`}
            open={deleteScheme}
            onClose={() => setDeleteScheme(false)}
            content={
              <Box display="flex" justifyContent="space-between">
                <Button
                  color="secondary"
                  onClick={() => setDeleteScheme(false)}
                >
                  Cancelar
                </Button>
                <Button
                  color="secondary"
                  onClick={() => {
                    handleDeleteScheme(scheme.id);
                  }}
                >
                  Excluir
                </Button>
              </Box>
            }
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>
      Você ainda não tem planejamentos cadastrados para essa turma
    </Typography>
  );
};

export default ViewScheme;
