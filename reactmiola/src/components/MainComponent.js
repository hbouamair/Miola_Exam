import React from 'react';
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import {useAuth0} from '@auth0/auth0-react'
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { Container, Row, Col} from 'react-bootstrap';
import Navigationbar from './Navigationbar'
import Bienvenue from './Bienvenue';
import Salleliste from '../crudcomponents/Salleliste';
import Salle from '../crudcomponents/Salle';
import Exam from '../crudcomponents/Exam';
import Cours from '../crudcomponents/Cours';
import {postSalle, fetchSalles,postEtudiant,fetchEtudiants,postProfesseur,fetchProfesseurs,postCours,fetchCourses} from '../redux/ActionCreators';
import { Component } from 'react';
import Etudiants from '../crudcomponents/Etudiants';
import  Professeurs  from '../crudcomponents/Professeurs';

const mapStateToProps = state => {
  return {
    salles: state.salles,
    etudiants: state.etudiants,
    professeurs: state.professeurs,
    courses: state.courses,
  }
}
const mapDispatchToProps=(dispatch) =>({
  postSalle: (id,nom,nbPlaces) => dispatch(postSalle(id,nom,nbPlaces)),
  fetchSalles: () => {dispatch(fetchSalles())},
  postEtudiant: (id,nom,prenom) => dispatch(postEtudiant(id,nom,prenom)),
  fetchEtudiants: () => {dispatch(fetchEtudiants())},
  postProfesseur: (id,nom,prenom) => dispatch(postProfesseur(id,nom,prenom)),
  fetchProfesseurs: () => {dispatch(fetchProfesseurs())},
  postCours: (nom,professeurNom) => dispatch(postCours(nom,professeurNom)),
  fetchCourses: () => {dispatch(fetchCourses())}
});
class Main extends Component {
  /*const {isLoading} =useAuth0();
  if (isLoading) return <div> Loading ...</div>*/
  componentDidMount(){
    this.props.fetchSalles();
    this.props.fetchEtudiants();
    this.props.fetchProfesseurs();
    this.props.fetchCourses();
  }

  render(){
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
        <Navigationbar/>
      <Container>
        <Row>
          <Col lg={12} >
          <Switch>
                <Route path="/" exact component={Bienvenue}/>
                  <Route path="/addSalle" exact component={() =><Salle postSalle={this.props.postSalle}/>}/>
                  <Route path="/listSalles" exact component={() =><Salleliste postSalle={this.props.postSalle} fetchSalles={this.props.fetchSalles}/>}/>
                  <Route path="/addExam" exact component={Exam}/>
                  <Route path="/listExam" exact component={Exam}/>
                  <Route path="/addCours" exact component={Exam}/>
                  <Route path="/listCours" exact component={() =><Cours postCours={this.props.postCours} fetchCourses={this.props.fetchCourses}/>}/>
                  <Route path="/listProfs" exact component={() =><Professeurs postProfesseur={this.props.postProfesseur} fetchProfesseurs={this.props.fetchProfesseurs}/>}/>
                  <Route path="/listEtuds" exact component={() =><Etudiants postEtudiant={this.props.postEtudiant} fetchEtudiants={this.props.fetchEtudiants}/>}/>
          </Switch>
          </Col>
        </Row>
      </Container>
      </Router>
      </>
      
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));

