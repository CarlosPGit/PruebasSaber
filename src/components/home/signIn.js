import React from "react";
import FrmSignInSide from "./frm/frmSignIn";
import CustomAlert from "../alert/Alert";
import { connect } from "react-redux";
import { login } from "../../actions/login.actions";
import { Redirect } from "react-router-dom";
import { Backdrop } from "@material-ui/core";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      open: false,
    };
  }

  onChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  onSubmit = () => {
    this.props
      .login({ email: this.state.email, password: this.state.password })
      .then(
        (res) => {
        },
        (err) => {
          this.setState({ ...this.state, open: true });
          console.log(err);
        }
      );
  };

  render() {
    return (
      <>
        <Backdrop
          style={{ zIndex: 2, color: "#fff" }}
          open={this.props.backDrop}
        ></Backdrop>
        {this.props.isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <>
            <CustomAlert
              Open={this.state.open}
              SetOpen={this.onChange}
              Type="error"
              Message="Error de autenticación, verifique e intentelo de nuevo."
            ></CustomAlert>
            <FrmSignInSide
              {...this.state}
              onChange={this.onChange}
              onClick={this.onSubmit}
            />
          </>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    backDrop: state.layout.backDrop,
  };
}
// export default SignIn;
export default connect(mapStateToProps, { login })(SignIn);
