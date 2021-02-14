import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import FrmPregunta from "./frmPregunta";
import FrmResultados from "./frmResultados";
import FrmMateria from "./frmMateria";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    minWidth: 800,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [item, setItem] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.Item)
      setItem({
        preguntaId: props.Item.preguntaId,
        pregunta: props.Item.descripcion,
        preguntaImagen: props.Item.imagen,
        opcion1: props.Item.opcionRespuestas[0].descripcion,
        opcion1Imagen: props.Item.opcionRespuestas[0].imagen,
        opcion2: props.Item.opcionRespuestas[1].descripcion,
        opcion2Imagen: props.Item.opcionRespuestas[1].imagen,
        opcion3: props.Item.opcionRespuestas[2].descripcion,
        opcion3Imagen: props.Item.opcionRespuestas[2].imagen,
        opcion4: props.Item.opcionRespuestas[3].descripcion,
        opcion4Imagen: props.Item.opcionRespuestas[3].imagen,
        esCorrecto: props.Item.opcionRespuestas[0].correcto
          ? 1
          : props.Item.opcionRespuestas[1].correcto
          ? 2
          : props.Item.opcionRespuestas[2].correcto
          ? 3
          : 4,
      });
    else if (props.Content === "frmPreguntas")
      setItem({
        preguntaId: 0,
        pregunta: "",
        preguntaPath: "",
        opcion1: "",
        opcion1Path: "",
        opcion2: "",
        opcion2Path: "",
        opcion3: "",
        opcion3Path: "",
        opcion4: "",
        opcion4Path: "",
        esCorrecto: 0,
      });
    else setItem("");
  }, [props]);

  const handleClose = () => {
    setItem({
      preguntaId: 0,
      pregunta: "",
      preguntaPath: "",
      opcion1: "",
      opcion1Path: "",
      opcion2: "",
      opcion2Path: "",
      opcion3: "",
      opcion3Path: "",
      opcion4: "",
      opcion4Path: "",
      esCorrecto: 0,
    });
    setErrors({});
    props.SetOpen(false);
  };

  const validateString = (cadena) => {
    if (cadena) return cadena === "" || cadena.trim() === "";
    else return true;
  };

  const handleSave = async () => {
    let data = {};
    let flagError = [{ errors: false }, {}];
    setErrors({});
    switch (props.Content) {
      case "frmPreguntas":
        data = {
          MateriaId: props.MateriaId,
          PreguntaId: item.preguntaId,
          Pregunta: item.pregunta,
          Image: item.preguntaPath,
          opcionesRespuesta: [
            {
              OpcionRespuestaId : props.Item ? props.Item.opcionRespuestas[0].opcionRespuestaId : null,
              OpcionRespuesta: item.opcion1,
              Imagen: item.opcion1Path,
              EsCorrecto: item.esCorrecto === 1,
            },
            {
              OpcionRespuestaId : props.Item ? props.Item.opcionRespuestas[1].opcionRespuestaId : null,
              OpcionRespuesta: item.opcion2,
              Imagen: item.opcion2Path,
              EsCorrecto: item.esCorrecto === 2,
            },
            {
              OpcionRespuestaId : props.Item ? props.Item.opcionRespuestas[2].opcionRespuestaId : null,
              OpcionRespuesta: item.opcion3,
              Imagen: item.opcion3Path,
              EsCorrecto: item.esCorrecto === 3,
            },
            {
              OpcionRespuestaId : props.Item ? props.Item.opcionRespuestas[3].opcionRespuestaId : null,
              OpcionRespuesta: item.opcion4,
              Imagen: item.opcion4Path,
              EsCorrecto: item.esCorrecto === 4,
            },
          ],
        };
        if (validateString(data.Pregunta) && validateString(data.Image)) {
          flagError[1] = { ...flagError[1], pregunta: true };
          flagError[0].errors = true;
        }
        if (
          validateString(data.opcionesRespuesta[0].OpcionRespuesta) &&
          validateString(data.opcionesRespuesta[0].Imagen)
        ) {
          flagError[1] = { ...flagError[1], opcion1: true };
          flagError[0].errors = true;
        }
        if (
          validateString(data.opcionesRespuesta[1].OpcionRespuesta) &&
          validateString(data.opcionesRespuesta[1].Imagen)
        ) {
          flagError[1] = { ...flagError[1], opcion2: true };
          flagError[0].errors = true;
        }
        if (
          validateString(data.opcionesRespuesta[2].OpcionRespuesta) &&
          validateString(data.opcionesRespuesta[2].Imagen)
        ) {
          flagError[1] = { ...flagError[1], opcion3: true };
          flagError[0].errors = true;
        }
        if (
          validateString(data.opcionesRespuesta[3].OpcionRespuesta) &&
          validateString(data.opcionesRespuesta[3].Imagen)
        ) {
          flagError[1] = { ...flagError[1], opcion4: true };
          flagError[0].errors = true;
        }
        break;
      case "frmMaterias":
        data = {
          Nombre: item,
        };

        if (validateString(item)) {
          flagError[1] = { ...flagError[1], materia: true };
          flagError[0].errors = true;
        }
        break;
      default:
        break;
    }

    setErrors(flagError[1]);
    if (!flagError[0].errors) props.AgreeFunction(data);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.Open}
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {props.Title}
        </DialogTitle>
        <DialogContent dividers>
          {props.Content === "frmPreguntas" ? (
            <FrmPregunta
              pregunta={item}
              setPregunta={setItem}
              Errors={errors}
            ></FrmPregunta>
          ) : props.Content === "frmResultados" ? (
            <FrmResultados Data={props.Data}></FrmResultados>
          ) : props.Content === "frmMaterias" ? (
            <FrmMateria
              Materia={item}
              setMateria={setItem}
              Errors={errors}
            ></FrmMateria>
          ) : (
            <></>
          )}
        </DialogContent>
        {props.Content === "frmResultados" ? (
          <></>
        ) : (
          <DialogActions>
            <Button autoFocus onClick={handleSave} color="primary">
              Guardar
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
}
