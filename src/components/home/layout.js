import * as React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  AppBar,
  Backdrop,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import { createStyles, makeStyles, withStyles } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import "./layout.css";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      boxShadow: "none",
    },
    title: {
      flexGrow: 1,
    },
  })
);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText("#673ab7"),
    backgroundColor: "#673ab7",
    "&:hover": {
      backgroundColor: "#492884",
    },
  },
}))(Button);

export default function Layout(Component) {
  const classes = useStyles();

  const configLink = React.forwardRef((props, ref) => (
    <Link innerRef={ref} to="/configuracion" {...props} />
  ));

  class layout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "",
      };
    }
    render() {
      return (
        <>
          <Backdrop
            style={{ zIndex: 2, color: "#fff" }}
            open={this.props.backDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {this.props.isAuthenticated ? (
            <>
              <div className={classes.grow}>
                <AppBar
                  position="static"
                  style={{ backgroundColor: "rgb(103, 58, 183)" }}
                >
                  <Toolbar>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Pruebas saber
                    </Typography>
                    {this.props.root ? (
                      <ColorButton
                        size="large"
                        className={classes.menuButton}
                        startIcon={<SettingsIcon />}
                        component={configLink}
                      >
                        Configuracion
                      </ColorButton>
                    ) : (
                      <></>
                    )}
                    <ColorButton color="inherit">Login</ColorButton>
                  </Toolbar>
                </AppBar>
              </div>
              <main className="contenido">
                <div className="light-font">
                  <nav>
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item active">
                        {this.props.title}
                      </li>
                    </ol>
                  </nav>
                </div>
                <Component />
              </main>
            </>
          ) : (
            <Redirect to="/signin" />
          )}
        </>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      root: state.auth.user.root,
      title: state.layout.title,
      backDrop: state.layout.backDrop,
    };
  }

  return connect(mapStateToProps)(layout);
}
