import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  gridCol: {
    textAlign: "center",
    fontWeight: "bold",
  },
  gridColInfo: {
    textAlign: "center",
  },
  grid: {
    //   borderBottom: "1px solid",
    marginBottom: 5,
  },
});

const FrmResultados = (props) => {
  const classes = useStyles();
  return (
    <>
      <Grid className={classes.grid} container spacing={3} alignItems="flex-start">
        <Grid className={classes.gridCol} item xs={2}>
          Prueba
        </Grid>
        <Grid className={classes.gridCol} item xs={3}>
          Nivel de Desempeño
        </Grid>
        <Grid className={classes.gridCol} item xs={1}>
          Puntaje
        </Grid>
        <Grid className={classes.gridCol} item xs={6}>
          Características de los niveles de desempeño en los que se encuentra
          evaluado.
        </Grid>
      </Grid>
      <Grid className={classes.grid} container spacing={3} alignItems="center">
        <Grid className={classes.gridColInfo} item xs={2}>
          {props.Data.nombreMateria}
        </Grid>
        <Grid className={classes.gridColInfo} item xs={3}>
          {props.Data.nivelDesempenio}
        </Grid>
        <Grid className={classes.gridColInfo} item xs={1}>
          {props.Data.puntos}
        </Grid>
        <Grid
          className={classes.gridColInfo}
          style={{ textAlign: "justify", fontSize: 12 }}
          item
          xs={6}
        >
          Para clasificar en este nivel, el estudiante:
          <br />
          <ul>
            {props.Data.caracteristicas.map(function (text, i) {
                return <li key={i}>{text}</li>
            })}
          </ul>
        </Grid>
      </Grid>
    </>
  );
};

export default FrmResultados;
