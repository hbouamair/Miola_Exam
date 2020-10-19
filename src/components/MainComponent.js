import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Navigationbar from "./Navigationbar";
import Home from "./Home";
import Salleliste from "../crudcomponents/Salleliste";
import Salle from "../crudcomponents/Salle";
import Exam from "../crudcomponents/Exam";
import Profil from "../components/Profi";
import Cours from "../crudcomponents/Cours";
import Resultats from "../crudcomponents/Resultats";
import CallbackPage from "./Callback";

import {
  postSalle,
  fetchSalles,
  postEtudiant,
  fetchEtudiants,
  postProfesseur,
  fetchProfesseurs,
  postCours,
  fetchCourses,
  postExam,
  fetchExams,
  postResultats,
  fetchResultats,
} from "../redux/ActionCreators";
import { Component } from "react";
import Etudiants from "../crudcomponents/Etudiants";
import Professeurs from "../crudcomponents/Professeurs";

const mapStateToProps = (state) => {
  return {
    salles: state.salles,
    etudiants: state.etudiants,
    professeurs: state.professeurs,
    courses: state.courses,
    exams: state.exams,
    resultats: state.resultats,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postSalle: (id, nom, nbPlaces) => dispatch(postSalle(id, nom, nbPlaces)),
  fetchSalles: () => {
    dispatch(fetchSalles());
  },
  postEtudiant: (id, nom, prenom) => dispatch(postEtudiant(id, nom, prenom)),
  fetchEtudiants: () => {
    dispatch(fetchEtudiants());
  },
  postProfesseur: (id, nom, prenom) =>
    dispatch(postProfesseur(id, nom, prenom)),
  fetchProfesseurs: () => {
    dispatch(fetchProfesseurs());
  },
  postCours: (nom, professeurNom) => dispatch(postCours(nom, professeurNom)),
  fetchCourses: () => {
    dispatch(fetchCourses());
  },
  postExam: (date, coursNom, sallesNoms) =>
    dispatch(postExam(date, coursNom, sallesNoms)),
  fetchExams: () => {
    dispatch(fetchExams());
  },
  postResultats: (nom, professeurNom, a, b) =>
    dispatch(postResultats(nom, professeurNom, a, b)),
  fetchResultats: () => {
    dispatch(fetchResultats());
  },
});
class Main extends Component {
  /*const {isLoading} =useAuth0();
  if (isLoading) return <div> Loading ...</div>*/
  componentDidMount() {
    this.props.fetchSalles();
    this.props.fetchEtudiants();
    this.props.fetchProfesseurs();
    this.props.fetchCourses();
    this.props.fetchExams();
    this.props.fetchResultats();
  }

  render() {
    /*const marginTop = { marginTop:"20px"}
      const addSalle =()=>{
        return(
          <Salle postSalle={this.props.postSalle}/>
        )
      }*/
    return (
      <>
        {/*<LoginButton/>
      <LogoutButton/>
      <Profile/>*/}

        <Router>
          <Navigationbar />

          <Row>
            <Switch>
              <Route path="/" exact component={Home} />

              <Container>
                <Col lg={12}>
                <Route path="/callback" component={CallbackPage}/>
                  <Route
                    path="/listSalles"
                    exact
                    component={() => (
                      <Salleliste
                        salles={this.props.salles.salles}
                        postSalle={this.props.postSalle}
                        fetchSalles={this.props.fetchSalles}
                      />
                    )}
                  />
                  <Route
                    path="/listExam"
                    exact
                    component={() => (
                      <Exam
                        postExam={this.props.postExam}
                        fetchExams={this.props.fetchExams}
                        fetchSalles={this.props.fetchSalles}
                        fetchCourses={this.props.fetchCourses}
                      />
                    )}
                  />
                  <Route
                    path="/listCours"
                    exact
                    component={() => (
                      <Cours
                        postCours={this.props.postCours}
                        fetchCourses={this.props.fetchCourses}
                      />
                    )}
                  />
                  <Route
                    path="/listProfs"
                    exact
                    component={() => (
                      <Professeurs
                        postProfesseur={this.props.postProfesseur}
                        fetchProfesseurs={this.props.fetchProfesseurs}
                      />
                    )}
                  />
                  <Route
                    path="/listEtuds"
                    exact
                    component={() => (
                      <Etudiants
                        postEtudiant={this.props.postEtudiant}
                        fetchEtudiants={this.props.fetchEtudiants}
                      />
                    )}
                  />
                  <Route
                    path="/listResultats"
                    exact
                    component={() => (
                      <Resultats
                        postResultats={this.props.postResultats}
                        fetchResultats={this.props.fetchResultats}
                      />
                    )}
                  />
                </Col>
              </Container>
            </Switch>
          </Row>
        </Router>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
