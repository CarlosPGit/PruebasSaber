import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { putTitle } from "../../actions/layout.actions";
import { getRandomQuestions } from "../../actions/data.actions";
import { getMaterias } from "../../api/materias.api";
import Pregunta from "../simulacro/pregunta";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Simulacro Pruebas Saber",
      materias: [],
      preguntas: [],
    };
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.putTitle(this.state.title);
      getMaterias().then(
        (res) => {
          this.setState({ ...this.state, materias: res.data });
        },
        (err) => {}
      );
    }
  }

  render() {
    const setQuestions = (data) => this.props.getRandomQuestions(data);
    return (
      <>
        {!this.props.isAuthenticated ? (
          <Redirect to="/signin" />
        ) : (
          <div style={{ marginTop: 30 }}>
            <Pregunta
              Materias={this.state.materias}
              setPreguntas={setQuestions}
            ></Pregunta>
          </div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, { putTitle, getRandomQuestions })(Home);
