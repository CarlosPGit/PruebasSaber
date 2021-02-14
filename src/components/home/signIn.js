import React from "react";
import FrmSignInSide from "./frm/frmSignIn";
import { connect } from "react-redux";
import { login } from "../../actions/login.actions";
import { Redirect } from "react-router-dom";
import { Backdrop } from "@material-ui/core";

class SignIn extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  onSubmit = () => {
    this.props.login({ ...this.state }).then(
      (res) => alert("ok"),
      (err) => console.log(err)
    );
  };

  render() {
    return (
      <>
        <Backdrop
          style={{ zIndex: 2, color: "#fff" }}
          open={this.props.backDrop}
        >
        </Backdrop>
        {this.props.isAuthenticated ? (
          <Redirect to="/home" />
        ) : (
          <FrmSignInSide
            {...this.state}
            onChange={this.onChange}
            onClick={this.onSubmit}
          />
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
