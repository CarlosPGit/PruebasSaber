import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  TextField,
  useTheme,
  withStyles,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MobileStepper from "@material-ui/core/MobileStepper";
import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import { useDispatch, useSelector } from "react-redux";
import { SET_QUESTIONS } from "../../actions/types";
import { sendAnswers } from "../../api/preguntas.api";
import CustomizedDialogs from "../configuracion/frm/modal";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    height: "100%",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  grid: {
    padding: 20,
  },
  gridTitulo: {
    padding: "0px 20px",
  },
  pregunta: {
    fontSize: 18,
    textAlign: "justify",
    marginLeft: 20,
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#673ab7"),
    backgroundColor: "#673ab7",
    "&:hover": {
      backgroundColor: "#492884",
    },
  },
}))(Button);

const Pregunta = (props) => {
  const [materia, setMateria] = React.useState({ materiaId: 0, nombre: "" });
  const [iniciar, setIniciar] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [respuesta, setRespuesta] = React.useState(0);
  const [minutos, setMinutos] = React.useState(0);
  const [segundos, setSegundos] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const preguntas = useSelector((state) => state.data.q);
  const maxSteps = preguntas.length;
  const setQuestions = useDispatch();

  const handleChange = (event, value) => {
    if (value) {
      setMateria(value);
    } else {
      setMateria({ materiaId: 0, nombre: "" });
    }
  };

  const handleChangeCheck = (value) => {
    let pre = preguntas;
    pre[activeStep].respuesta = value.opcionRespuestaId;

    setQuestions({ type: SET_QUESTIONS, payload: pre });
  };

  const loadQuestion = () => {
    if (!iniciar) {
      if (Number.isInteger(materia.materiaId) && materia.materiaId != 0)
        props.setPreguntas(materia.materiaId).then(
          (res) => {
            setIniciar(!iniciar);
            setMinutos(0);
            setSegundos(0);
          },
          (err) => {}
        );
    } else
      sendAnswers(preguntas).then(
        (res) => {
          setIniciar(!iniciar);
          setQuestions({ type: SET_QUESTIONS, payload: [] });
          setActiveStep(0);
          setRespuesta({ ...res.data[0], nombreMateria: materia.nombre });
          setOpenModal(true);
        },
        (err) => alert("paila")
      );
  };

  useEffect(() => {
    let interval = null;
    if (iniciar) {
      if (segundos === 59) {
        setSegundos(0);
        setMinutos((minutos) => minutos + 1);
      }

      interval = setInterval(() => {
        setSegundos((segundos) => segundos + 1);
      }, 1000);
    } else if (!iniciar && segundos !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [iniciar, segundos]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          spacing={3}
          alignItems="center"
        >
          <Grid item xs={3}>
            <Autocomplete
              id="combo-box-demo"
              options={props.Materias}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option.nombre
              }
              style={{ width: "100%" }}
              value={materia}
              onChange={handleChange}
              disabled={iniciar}
              renderInput={(params) => (
                <TextField {...params} label="Area" variant="outlined" />
              )}
            />
          </Grid>
          <Grid item xs={7}></Grid>

          <Grid item xs={2}>
            <ColorButton
              color="inherit"
              size="large"
              className={classes.button}
              startIcon={
                iniciar ? (
                  <StopRoundedIcon />
                ) : (
                  <PlayCircleFilledWhiteOutlinedIcon />
                )
              }
              onClick={() => {
                loadQuestion();
              }}
            >
              {(iniciar ? "Finalizar  " : "Iniciar  ") +
                (minutos.toString().padStart(2, "0") +
                  ":" +
                  segundos.toString().padStart(2, "0"))}
            </ColorButton>
          </Grid>
        </Grid>
      </div>

      {preguntas.length > 0 ? (
        <div className={classes.root}>
          <Grid container spacing={3} className={classes.gridTitulo}>
            <Grid item xs={12}>
              <div className="parallelogram">
                <div className="text">
                  <h4>Pregunta {activeStep + 1}</h4>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <p className={classes.pregunta}>
                {preguntas[activeStep].descripcion}
              </p>
            </Grid>
          </Grid>
          <Grid container spacing={3} alignItems="center" justify="center">
            <Grid item xs={12} style={{ textAlign: "center" }}>
              {preguntas[activeStep].imagen != "" ? (
                <img style={{maxWidth:800}} src={preguntas[activeStep].imagen}></img>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>

          <Grid className={classes.grid} container spacing={3}>
            <Grid item xs={6} className={classes.gridCol}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          preguntas[activeStep].respuesta ===
                          preguntas[activeStep].opcionRespuestas[0]
                            .opcionRespuestaId
                        }
                        style={{
                          color: "#673ab7",
                        }}
                        onChange={() => {
                          handleChangeCheck(
                            preguntas[activeStep].opcionRespuestas[0]
                          );
                        }}
                        name="esCorrecto"
                      />
                    }
                    label={"a."}
                  />
                </Grid>
                <Grid item xs={11}>
                  {preguntas[activeStep].opcionRespuestas[0].imagen != "" &&
                  preguntas[activeStep].opcionRespuestas[0].imagen != null ? (
                    <img
                      width={100}
                      src={preguntas[activeStep].opcionRespuestas[0].imagen}
                    ></img>
                  ) : (
                    <label>
                      {preguntas[activeStep].opcionRespuestas[0].descripcion}
                    </label>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.gridCol}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          preguntas[activeStep].respuesta ===
                          preguntas[activeStep].opcionRespuestas[1]
                            .opcionRespuestaId
                        }
                        style={{
                          color: "#673ab7",
                        }}
                        onChange={() => {
                          handleChangeCheck(
                            preguntas[activeStep].opcionRespuestas[1]
                          );
                        }}
                        name="esCorrecto"
                      />
                    }
                    label={"b."}
                  />
                </Grid>
                <Grid item xs={11}>
                  {preguntas[activeStep].opcionRespuestas[1].imagen != "" &&
                  preguntas[activeStep].opcionRespuestas[1].imagen != null ? (
                    <img
                      width={100}
                      src={preguntas[activeStep].opcionRespuestas[1].imagen}
                    ></img>
                  ) : (
                    <label>
                      {preguntas[activeStep].opcionRespuestas[1].descripcion}
                    </label>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.grid} container spacing={3}>
            <Grid item xs={6} className={classes.gridCol}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          preguntas[activeStep].respuesta ===
                          preguntas[activeStep].opcionRespuestas[2]
                            .opcionRespuestaId
                        }
                        style={{
                          color: "#673ab7",
                        }}
                        onChange={() => {
                          handleChangeCheck(
                            preguntas[activeStep].opcionRespuestas[2]
                          );
                        }}
                        name="esCorrecto"
                      />
                    }
                    label={"c."}
                  />
                </Grid>
                <Grid item xs={11}>
                  {preguntas[activeStep].opcionRespuestas[2].imagen != "" &&
                  preguntas[activeStep].opcionRespuestas[2].imagen != null ? (
                    <img
                      width={100}
                      src={preguntas[activeStep].opcionRespuestas[2].imagen}
                    ></img>
                  ) : (
                    <label>
                      {preguntas[activeStep].opcionRespuestas[2].descripcion}
                    </label>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} className={classes.gridCol}>
              <Grid container alignItems="center" justify="flex-start">
                <Grid item xs={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          preguntas[activeStep].respuesta ===
                          preguntas[activeStep].opcionRespuestas[3]
                            .opcionRespuestaId
                        }
                        style={{
                          color: "#673ab7",
                        }}
                        onChange={() => {
                          handleChangeCheck(
                            preguntas[activeStep].opcionRespuestas[3]
                          );
                        }}
                        name="esCorrecto"
                      />
                    }
                    label={"d."}
                  />
                </Grid>
                <Grid item xs={11}>
                  {preguntas[activeStep].opcionRespuestas[3].imagen != "" &&
                  preguntas[activeStep].opcionRespuestas[3].imagen != null ? (
                    <img
                      width={100}
                      src={preguntas[activeStep].opcionRespuestas[3].imagen}
                    ></img>
                  ) : (
                    <label>
                      {preguntas[activeStep].opcionRespuestas[3].descripcion}
                    </label>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <MobileStepper
            style={{ marginTop: 30 }}
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Siguiente
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Anterior
              </Button>
            }
          />
        </div>
      ) : (
        <></>
      )}

      <CustomizedDialogs
        Title="Resultados"
        Content="frmResultados"
        Open={openModal}
        SetOpen={setOpenModal}
        Data={respuesta}
      ></CustomizedDialogs>
    </>
  );
};

export default Pregunta;
