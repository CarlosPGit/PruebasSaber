import React, { useEffect } from "react";
import {
  Button,
  Grid,
  IconButton,
  makeStyles,
  withStyles,
  TableCell,
  TableRow,
  TableBody,
  Box,
  Typography,
  Collapse,
  Table,
  TableContainer,
  Paper,
  TableHead,
  Toolbar,
  TablePagination,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  getQuestionsbyMateria,
  deleteMateriaById,
  getMaterias,
  createMateria,
} from "../../../api/materias.api";
import CustomizedDialogs from "./modal";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AlertDialog from "./dialog";
import {
  createQuestion,
  deletePreguntaById,
  updateQuestion,
} from "../../../api/preguntas.api";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
    height: "100%",
    borderRadius: 15,
    padding: 30,
  },
  table: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  button: {
    textTransform: "none",
  },
  grid: {
    padding: 20,
  },
  toolbar: { backgroundColor: "rgb(103, 58, 183)", color: "#fff" },
  toolbarTitle: {
    flex: "1 1 100%",
  },
});

const ColorButton = withStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.getContrastText("#673ab7"),
    backgroundColor: "#673ab7",
    "&:hover": {
      backgroundColor: "#492884",
    },
  },
}))(Button);

export default function FrmConfig(props) {
  const classes = useStyles();
  const [materias, setMaterias] = React.useState([]);
  const [materia, setMateria] = React.useState({ materiaId: 0, nombre: "" });
  const [preguntas, setPreguntas] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState({
    open: false,
    Title: "",
    Content: "",
  });
  const [Modal, setModal] = React.useState({});

  const cargarMaterias = () => {
    getMaterias().then(
      (res) => {
        setMaterias(res.data);
      },
      (err) => {}
    );
  };

  const handleChange = (event, value) => {
    if (value) {
      setMateria(value);
      loadQuestion(value.materiaId);
    } else {
      setMateria({ materiaId: 0, nombre: "" });
      setPreguntas([]);
    }
  };

  const loadQuestion = (materiaId) => {
    getQuestionsbyMateria(materiaId).then(
      (res) => {
        setPreguntas(res.data);
      },
      (err) => {}
    );
  };

  const handleChangeRowsPerPage = (event) => {
    let rows = parseInt(event.target.value, 10);

    setRowsPerPage(rows);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteMateria = async () => {
    await deleteMateriaById(materia.materiaId);
    setMateria({ materiaId: 0, nombre: "" });
    cargarMaterias();
  };

  const deletePregunta = async (data) => {
    await deletePreguntaById(data).then(
      (res) => {
        loadQuestion(materia.materiaId);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const crearMateria = (data) => {
    createMateria(data).then(
      (res) => {
        cargarMaterias();
        setOpenModal(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const crearPregunta = (data) => {
    if (data.PreguntaId && data.PreguntaId > 0)
      updateQuestion(data).then(
        (res) => {
          loadQuestion(materia.materiaId);
          setOpenModal(false);
        },
        (err) => {
          console.log(err);
        }
      );
    else
      createQuestion(data).then(
        (res) => {
          loadQuestion(materia.materiaId);
          setOpenModal(false);
        },
        (err) => {
          console.log(err);
        }
      );
  };

  useEffect(() => {
    cargarMaterias();
  }, []);

  function Row(props) {
    const { row, setOpenModal, setModal } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.table}>
          <TableCell width={50}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.imagen && row.imagen != "" ? (
              <img width={50} height={50} src={row.imagen}></img>
            ) : (
              row.descripcion
            )}
          </TableCell>
          <TableCell width={50} style={{ display: "flex", float: "right" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setModal({
                  Title: "Preguntas",
                  Content: "frmPreguntas",
                  Item: row,
                  AgreeFunction: crearPregunta,
                });
                setOpenModal(true);
              }}
            >
              <EditOutlinedIcon></EditOutlinedIcon>
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => {
                setOpenDialog({
                  open: true,
                  Title: "Eliminar Pregunta",
                  Content: `Seguro de que desea eliminar la pregunta "${row.descripcion.substring(
                    0,
                    30
                  )}..."?`,
                  AgreeFunction: deletePregunta,
                  ItemId: row.preguntaId,
                });
              }}
            >
              <DeleteOutlineOutlinedIcon></DeleteOutlineOutlinedIcon>
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Respuestas
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.opcionRespuestas.map((opciones, i) => (
                      <TableRow key={i}>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ display: "flex" }}
                        >
                          {opciones.imagen && opciones.imagen != "" ? (
                            <>
                              <div style={{ marginTop: 15, marginRight: 10 }}>
                                {i + 1 + "."}
                              </div>
                              <img
                                width={50}
                                height={50}
                                src={opciones.imagen}
                              ></img>
                            </>
                          ) : (
                            <>
                              <div style={{ marginRight: 10 }}>
                                {i + 1 + "."}
                              </div>
                              {opciones.descripcion}
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container spacing={3} alignItems="center">
        <Grid item sm={6} lg={3}>
          <Autocomplete
            id="combo-box-demo"
            options={materias}
            getOptionLabel={(option) =>
              typeof option === "string" ? option : option.nombre
            }
            style={{ width: "100%" }}
            value={materia}
            onChange={handleChange}
            renderInput={(params) => (
              <TextField {...params} label="Materia" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item sm={6} lg={4} >
          <Grid container spacing={1}>
            <Grid item sm={6} lg={3} md={4}>
              <ColorButton
                color="inherit"
                size="large"
                className={classes.button}
                startIcon={<AddCircleOutlineRoundedIcon />}
                disableRipple
                onClick={() => {
                  setModal({
                    Title: "Materias",
                    Content: "frmMaterias",
                    AgreeFunction: crearMateria,
                  });
                  setOpenModal(true);
                }}
              >
                Agregar
              </ColorButton>
            </Grid>
            <Grid item sm={6} lg={3} md={4}>
              {materia.materiaId ? (
                <ColorButton
                  color="inherit"
                  size="large"
                  className={classes.button}
                  startIcon={<DeleteOutlineOutlinedIcon />}
                  disableRipple
                  onClick={() => {
                    setOpenDialog({
                      open: true,
                      Title: "Eliminar Materia",
                      Content: `Seguro de que desea eliminar la materia ${materia.nombre}?`,
                      AgreeFunction: deleteMateria,
                    });
                  }}
                >
                  Eliminar
                </ColorButton>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Grid className={classes.grid} container alignItems="center">
        <Grid item xs={12}>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.toolbarTitle} variant="h6">
              Preguntas
            </Typography>
            {materia.materiaId ? (
              <Button
                color="inherit"
                size="large"
                className={classes.button}
                startIcon={<AddCircleOutlineRoundedIcon />}
                disableRipple
                onClick={() => {
                  setModal({
                    Title: "Preguntas",
                    Content: "frmPreguntas",
                    AgreeFunction: crearPregunta,
                  });
                  setOpenModal(true);
                }}
              >
                Agregar
              </Button>
            ) : (
              <></>
            )}
          </Toolbar>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Pregunta</TableCell>
                  <TableCell width={50}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materia.materiaId ? (
                  preguntas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <Row
                        key={row.preguntaId}
                        row={row}
                        setModal={setModal}
                        setOpenModal={setOpenModal}
                      />
                    ))
                ) : (
                  <></>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={preguntas.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por pagina:"
            nextIconButtonText="Siguiente"
            backIconButtonText="Anterior"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} de ${count}`
            }
          />
        </Grid>
      </Grid>
      <CustomizedDialogs
        {...Modal}
        MateriaId={materia.materiaId}
        Open={openModal}
        SetOpen={setOpenModal}
      ></CustomizedDialogs>
      <AlertDialog {...openDialog} setOpen={setOpenDialog}></AlertDialog>
    </div>
  );
}
