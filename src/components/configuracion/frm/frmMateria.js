import { TextField } from "@material-ui/core";
import React from "react";

const FrmMateria = (props) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      autoComplete="off"
      required
      error={props.Errors.materia}
      fullWidth
      name="materia"
      label="Materia"
      type="text"
      id="materia"
      value={props.materia}
      onChange={(e) => {
        props.setMateria(e.target.value);
      }}
    ></TextField>
  );
};

export default FrmMateria;
