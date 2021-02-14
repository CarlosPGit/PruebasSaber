import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import ImageSearchOutlinedIcon from "@material-ui/icons/ImageSearchOutlined";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import Pregunta from "../../simulacro/pregunta";

const FrmPregunta = (props) => {
  const { pregunta, setPregunta } = props;

  const [imagen, setImagen] = useState({
    pregunta: pregunta.preguntaImagen && pregunta.preguntaImagen != "",
    opcion1: pregunta.opcion1Imagen && pregunta.opcion1Imagen != "",
    opcion2: pregunta.opcion2Imagen && pregunta.opcion2Imagen != "",
    opcion3: pregunta.opcion3Imagen && pregunta.opcion3Imagen != "",
    opcion4: pregunta.opcion4Imagen && pregunta.opcion4Imagen != "",
  });

  const handleChange = (value) => {
    setPregunta({ ...pregunta, esCorrecto: value });
  };

  const handleImagen = (data) => {
    setImagen({ ...imagen, ...data });
  };

  const handleImageChange = (e, opcion) => {
    e.preventDefault();
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      switch (opcion) {
        case 0:
          setPregunta({
            ...pregunta,
            preguntaPath: reader.result,
            pregunta: "",
          });
          break;
        case 1:
          setPregunta({ ...pregunta, opcion1Path: reader.result, opcion1: "" });
          break;
        case 2:
          setPregunta({ ...pregunta, opcion2Path: reader.result, opcion2: "" });
          break;
        case 3:
          setPregunta({ ...pregunta, opcion3Path: reader.result, opcion3: "" });
          break;
        case 4:
          setPregunta({ ...pregunta, opcion4Path: reader.result, opcion4: "" });
          break;
        default:
          break;
      }
    };
  };

  return (
    <div style={{ padding: 20 }}>
      <form>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            {!imagen.pregunta ? (
              <TextField
                variant="outlined"
                margin="normal"
                autoComplete="off"
                required
                error={props.Errors.pregunta}
                fullWidth
                name="pregunta"
                label="Pregunta"
                type="text"
                id="pregunta"
                value={pregunta.pregunta}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handleImagen({ pregunta: !imagen.pregunta });
                        }}
                      >
                        <ImageSearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPregunta({ ...pregunta, pregunta: e.target.value });
                }}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {pregunta.preguntaImagen && pregunta.preguntaImagen != "" ? (
                  <img
                    src={pregunta.preguntaImagen}
                    style={{ marginTop: 8, marginRight: 8 }}
                    width={50}
                    height={50}
                  ></img>
                ) : (
                  <></>
                )}
                <TextField
                  type="file"
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  required
                  error={props.Errors.pregunta}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleImagen({ pregunta: !imagen.pregunta });
                          }}
                        >
                          <ChatOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleImageChange(e, 0);
                  }}
                ></TextField>
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10}>
            {!imagen.opcion1 ? (
              <TextField
                variant="outlined"
                margin="normal"
                autoComplete="off"
                required
                fullWidth
                name="opcion1"
                label="Opcion 1"
                type="text"
                id="opcion1"
                error={props.Errors.opcion1}
                value={pregunta.opcion1}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handleImagen({ opcion1: !imagen.opcion1 });
                        }}
                      >
                        <ImageSearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPregunta({ ...pregunta, opcion1: e.target.value });
                }}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {pregunta.opcion1Imagen && pregunta.opcion1Imagen != "" ? (
                  <img
                    src={pregunta.opcion1Imagen}
                    style={{ marginTop: 8, marginRight: 8 }}
                    width={50}
                    height={50}
                  ></img>
                ) : (
                  <></>
                )}
                <TextField
                  type="file"
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  required
                  error={props.Errors.opcion1}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleImagen({ opcion1: !imagen.opcion1 });
                          }}
                        >
                          <ChatOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleImageChange(e, 1);
                  }}
                ></TextField>
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pregunta.esCorrecto === 1}
                  onChange={() => {
                    handleChange(1);
                  }}
                  name="esCorrecto"
                />
              }
              label="Correcto"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10}>
            {!imagen.opcion2 ? (
              <TextField
                variant="outlined"
                margin="normal"
                autoComplete="off"
                required
                fullWidth
                error={props.Errors.opcion2}
                name="opcion2"
                label="Opcion 2"
                type="text"
                id="opcion2"
                value={pregunta.opcion2}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handleImagen({ opcion2: !imagen.opcion2 });
                        }}
                      >
                        <ImageSearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPregunta({ ...pregunta, opcion2: e.target.value });
                }}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {pregunta.opcion2Imagen && pregunta.opcion2Imagen != "" ? (
                  <img
                    src={pregunta.opcion2Imagen}
                    style={{ marginTop: 8, marginRight: 8 }}
                    width={50}
                    height={50}
                  ></img>
                ) : (
                  <></>
                )}
                <TextField
                  type="file"
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  required
                  error={props.Errors.opcion2}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleImagen({ opcion2: !imagen.opcion2 });
                          }}
                        >
                          <ChatOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleImageChange(e, 2);
                  }}
                ></TextField>
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pregunta.esCorrecto === 2}
                  onChange={() => {
                    handleChange(2);
                  }}
                  name="esCorrecto"
                />
              }
              label="Correcto"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10}>
            {!imagen.opcion3 ? (
              <TextField
                variant="outlined"
                margin="normal"
                autoComplete="off"
                required
                fullWidth
                error={props.Errors.opcion3}
                name="opcion3"
                label="Opcion 3"
                type="text"
                id="opcion3"
                value={pregunta.opcion3}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handleImagen({ opcion3: !imagen.opcion3 });
                        }}
                      >
                        <ImageSearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPregunta({ ...pregunta, opcion3: e.target.value });
                }}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {pregunta.opcion3Imagen && pregunta.opcion3Imagen != "" ? (
                  <img
                    src={pregunta.opcion3Imagen}
                    style={{ marginTop: 8, marginRight: 8 }}
                    width={50}
                    height={50}
                  ></img>
                ) : (
                  <></>
                )}
                <TextField
                  type="file"
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  required
                  error={props.Errors.opcion3}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleImagen({ opcion3: !imagen.opcion3 });
                          }}
                        >
                          <ChatOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleImageChange(e, 3);
                  }}
                ></TextField>
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pregunta.esCorrecto === 3}
                  onChange={() => {
                    handleChange(3);
                  }}
                  name="esCorrecto"
                />
              }
              label="Correcto"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={10}>
            {!imagen.opcion4 ? (
              <TextField
                variant="outlined"
                margin="normal"
                required
                autoComplete="off"
                fullWidth
                error={props.Errors.opcion4}
                name="opcion4"
                label="Opcion 4"
                type="text"
                id="opcion4"
                value={pregunta.opcion4}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => {
                          handleImagen({ opcion4: !imagen.opcion4 });
                        }}
                      >
                        <ImageSearchOutlinedIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setPregunta({ ...pregunta, opcion4: e.target.value });
                }}
              />
            ) : (
              <div style={{ display: "flex", alignItems: "center" }}>
                {pregunta.opcion4Imagen && pregunta.opcion4Imagen != "" ? (
                  <img
                    src={pregunta.opcion4Imagen}
                    style={{ marginTop: 8, marginRight: 8 }}
                    width={50}
                    height={50}
                  ></img>
                ) : (
                  <></>
                )}
                <TextField
                  type="file"
                  variant="outlined"
                  margin="normal"
                  autoComplete="off"
                  required
                  error={props.Errors.opcion4}
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => {
                            handleImagen({ opcion4: !imagen.opcion4 });
                          }}
                        >
                          <ChatOutlinedIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => {
                    handleImageChange(e, 4);
                  }}
                ></TextField>
              </div>
            )}
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={pregunta.esCorrecto === 4}
                  onChange={() => {
                    handleChange(4);
                  }}
                  name="esCorrecto"
                />
              }
              label="Correcto"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default FrmPregunta;
