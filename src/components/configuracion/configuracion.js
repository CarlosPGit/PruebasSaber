import React from "react";
import { connect } from "react-redux";
import { putTitle } from "../../actions/layout.actions";
import FrmConfig from "./frm/frmConfig";

class Config extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Configuracion",
    };
  }

  componentDidMount() {
    if (this.props.root) {
      this.props.putTitle(this.state.title);
    }
  }

  render() {
    return (
      <>
        {this.props.root ? (
          <div style={{ marginTop: 30 }}>
            <FrmConfig></FrmConfig>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    root: state.auth.user.root,
  };
}

export default connect(mapStateToProps, { putTitle })(Config);
