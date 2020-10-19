import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Card, Form, Col } from 'react-bootstrap';
import { AuthConsumer } from '../authContext';
import { Redirect } from "react-router-dom";
import Can from '../components/Can';
export default class Salle extends Component{

  initialState = {
    nom:'',
    nbPlaces:'',
  }
  constructor(props) {
    super(props);
    this.state=this.initialState;
    this.salleChange = this.salleChange.bind(this);
    this.submitSalle = this.submitSalle.bind(this);
  }
  submitSalle(event) {
    /*event.preventDefault();
    const salle={
      nom:this.state.nom,
      nbPlaces:this.state.nbPlaces
    }
    axios.post("http://localhost:4001/salles", salle)
    .then(response => {
      if (response.data != null) {
        this.setState(this.initialState);
        alert("Salle enregistrée avec succès");
      }
    })*/
    //console.log("Current State is :"+ JSON.stringify(values));
    //alert(this.state.nbPlaces+ " " +this.state.nom);
    event.preventDefault();
    this.props.postSalle(this.state.nom,this.state.nbPlaces)

  }

  salleChange(event) {
    console.log([event.target.name] + " " +event.target.value + "\n")
    this.setState (
      { [event.target.name]:event.target.value }
    ) ;
  }

  render(){
    return(
      <Card className={"border border-dark bg-dark text-white"}>
      <Card.Header>
         Ajouter une Salle
        </Card.Header>
      <Form onSubmit={this.submitSalle}>
      <Card.Body>
      <Form.Row>
          <Form.Group as={Col} controlId="formGridMarque">
          <Form.Label> Nom </Form.Label>
          <Form.Control name="nom" autoComplete="off" required type="text" className={"bg-dark text-white"}
            model=".nom" value = {this.state.nom} onChange = {this.salleChange} placeholder= "Entrez le nom de la salle"/>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridModele">
          <Form.Label> Nombre de places </Form.Label>
          <Form.Control name="nbPlaces" autoComplete="off" required type="integer" className={"bg-dark text-white"}
            model=".nbPlaces" value = {this.state.nbPlaces} onChange = {this.salleChange} placeholder= "Entrez le nombre de places disponible"/>
          </Form.Group>
      </Form.Row>
      </Card.Body>
      <Card.Footer style={{"textAlign":"right"}}>
      <Button
      variant="contained"
      color="primary"
      type="submit"
     > Submit
    </Button>{' '}
          <Button size="sm" variant="info" type="reset">  Reset </Button>
      </Card.Footer>
      </Form>
      </Card>
      
          );
          }
        }
