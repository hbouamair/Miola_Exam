import React, { Component } from "react";
import {  Card,  ModalBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "../components/MyToast";
import { Modal, ModalHeader, Label, Row, Col } from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";
import Can from "../components/Can";
import { AuthConsumer } from "../authContext";
export default class Resultats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      resultatId: null,
      addOrEdit: false,
      courChoisi: null,
      etudiantChoisi: null,
      note:null,
      iscourselected:false
    };
    this.toggleModal = this.toggleModal.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.addToggle = this.addToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange_etud = this.handleChange_etud.bind(this);

    this.state = { resultats: [], cours:[], etudiants:[] };
  }

  toggleModal = (resultatId,courchoix,etudiantchoix, note) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      resultatId: resultatId,
      courChoisi:courchoix,
      etudiantChoisi:etudiantchoix,
      note:note
    });
  };


  add = () => {
    this.setState({
      addOrEdit: true,
    });
  };
  edit = () => {
    this.setState({
      addOrEdit: false,
    });
  };
  addToggle = () => {
    this.add();
    this.toggleModal();
  };
  editToggle = (resultatId,courchoix,etudiantchoix, note) => {
    console.log("resultatId" + resultatId);
    this.edit();
    this.toggleModal(resultatId,courchoix,etudiantchoix, note);
  };

  handleChange(e) {  
    this.setState({ courChoisi: e.target.value, iscourselected:true });
    console.log("Fruit Selected!!"+ e.target.value);
  }

  handleChange_etud(e) {
    if(this.state.addOrEdit===true){
    this.setState({ etudiantChoisi: e.target.value });
    console.log("Fruit Selected!!"+ e.target.value);
    }
  }



  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.resultatId);
    this.props.updateResultat(state.resultatId,values.nom,values.prenom)
}*/
  componentDidMount() {
    fetch("http://localhost:8080/resultats")
      .then((response) => response.json())
      .then((responseData) => {
        //console.log("test  " + responseData);
        this.setState({
          resultats: responseData,
        });
      })
      .catch((err) => console.error(err));
      fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((responseData) => {
       // console.log("test  " + responseData);
        this.setState({
          cours: responseData,
        });
      })
      .catch((err) => console.error(err));
      fetch("http://localhost:8080/etudiants")
      .then((response) => response.json())
      .then((responseData) => {
        //console.log("test  " + responseData);
        this.setState({
          etudiants: responseData,
        });
      })
      .catch((err) => console.error(err));
  }
  deleteResultat = (resultatId) => {
    axios
      .delete("http://localhost:8080/resultats/" + resultatId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            resultats: this.state.resultats.filter(
              (resultat) => resultat.id !== resultatId
            ),
          });
          alert("resultat supprimée avec succès.");
        } else {
          alert("pas de suppression.");
        }
      });
  };
  handleResultat = (values, state) => {
    console.log(this.state.addOrEdit + this.state.resultatId);
    console.log(this.state.etudiantChoisi.split(" ")[0]+ this.state.etudiantChoisi.split(" ")[1]);

    if (this.state.addOrEdit === true) { 

      this.props.postResultats( values.note, this.state.courChoisi, this.state.etudiantChoisi.split(" ")[0], this.state.etudiantChoisi.split(" ")[1]);
    } else {
      const options = {
        method: "put",
        url: "http://localhost:8080/resultats/" + state.resultatId,
        data: {
          note:values.note,
          nomCours:this.state.courChoisi, 
          nomEtudiant:this.state.etudiantChoisi.split(" ")[0], 
          prenomEtudiant:this.state.etudiantChoisi.split(" ")[1]
        },
        headers: {
          "Content-Type": "application/json",
          'action':'post-result-no-ids'

        },
      };
      axios(options);
    }
    setTimeout(() => {
      this.props.fetchResultats();
    }, 1000);
  };

  render() {

    const ListEtud = () =>{
      if (this.state.addOrEdit===true){
        return (
          <Row className="form-group">
            <Col >
                  <Label htmlFor="Name" >
                    Etudiant
                  </Label>
                  </Col>
                  <Col md={7}>
                  <select
                      model=".prenomEtudiant"
                      className="form-control"
                      id="prenomEtudiant"
                      name="prenomEtudiant"
                      value={this.state.etudiantChoisi}
                      onChange={this.handleChange_etud}
                     required>
                      <option value="" disabled selected>Veuillez choisir une option</option>
                      {this.state.etudiants.map((etudiant) => (
                      new Set (etudiant.courssuivi.map((cour)=>(
                        cour.cours.nom === this.state.courChoisi && !cour.resultat ? 
                         (<option  className="form-control" key={etudiant.nom+" "+etudiant.prenom} value={etudiant.nom+" "+etudiant.prenom}>{etudiant.nom} {etudiant.prenom}</option>
                        
                         ):(<default/>)

                      )))
                      ))
                      }                
                    </select>
                    
                   
                  </Col>
                </Row>)
      }
      else return <div></div>
    }

    const Modalle = () => {
      return (
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Résultat</ModalHeader>
            <ModalBody>
              <LocalForm
                onSubmit={(values) => this.handleResultat(values, this.state)}
              >
                
                <Row className="form-group">
                  <Label htmlFor="Name" md={5}>
                    Cours
                  </Label>
                  <Col md={7}>
                    <select
                      model=".nomCours"
                      className="form-control"
                      id="nomCours"
                      name="nomCours"                      
                      value={this.state.courChoisi}   
                      onChange={this.handleChange}
                      required
                    >
                      <option value="" disabled selected>Veuillez choisir une option</option>
                    <AuthConsumer>
                    {({user})=>user.role==="professeur"?(
                      
                        this.state.cours.map((cour) => (
                          (cour.professeur.prenom+" "+cour.professeur.nom===user.name)?(
                            <option  className="form-control" key={cour.nom} value={cour.nom}>{cour.nom}</option>

                          ):(<default/>)
                      ))                   
                       
                    ):(
                      this.state.cours.map((cour) => (
                        <option  className="form-control" key={cour.nom} value={cour.nom}>{cour.nom}</option>
                     ))                   
                     
                    )
                      }</AuthConsumer>             
                    </select>
                    
                   
                  </Col>
                </Row>
                <ListEtud/>

                <Row className="form-group">
                  <Label htmlFor="Name" md={5}>
                    Note
                  </Label>
                  <Col md={7}>
                    <Control.text
                      model=".note"
                      className="form-control"
                      id="note"
                      name="note"
                      placeholder="Note"
                      required
                      defaultValue={this.state.note}
                    />
                  </Col>
                </Row>
                


                <Row classname="form-group">
                  <Col md={{ size: 10 }}>
                    <Button variant="contained"
                    color="primary"
                    type="submit">
                      Enregister
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    };
    return (
      <AuthConsumer>
      {({ authenticated, user }) =>
        authenticated ? (
      <div className="container py-5">
        <Modalle />
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            children={{
              show: this.state.show,
              message: "resultat supprimée avec succès.",
              type: "danger",
            }}
          />
        </div>
        <Card className={"border border-dark bg-light text-black"}>
          <Card.Header>
            <FontAwesomeIcon icon={faList} />{''}<strong className="head"> Liste des résultats</strong>
            <Can
                               role={user.role}
                               perform="resultat:add"
                               data={{
                                 userId: user.id,
                               }}
                               yes={() => ( 
            <div style={{ float: "right" }}>
            <Fab  onClick={this.addToggle} color="primary" aria-label="add">
            <AddIcon />
           </Fab>
            </div>)}
            />
          </Card.Header>
          <Card.Body>
          <Paper>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><strong>Id</strong></TableCell>
                  <TableCell><strong>Nom étudiant</strong></TableCell>
                  <TableCell><strong>Nom cours</strong></TableCell>
                  <TableCell><strong>Note</strong></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.resultats.length === 0 ? (
                  <TableRow align="center">
                    <TableCell colSpan="6">Aucun résultat disponible.</TableCell>
                  </TableRow>
                ) : (
                  this.state.resultats.map((resultat) => (
                    <Can
                               role={user.role}
                               perform="resultat:visit"
                               data={{
                                 userId: user.name,
                                 postOwnerId: resultat.coursSuivi.etudiant.prenom+" "+resultat.coursSuivi.etudiant.nom
                               }}
                               yes={() => ( 
                    <TableRow key={resultat.id}>
                      <TableCell>{resultat.id}</TableCell>
                      <TableCell>{resultat.coursSuivi.etudiant.nom}</TableCell>
                      <TableCell>{resultat.coursSuivi.cours.nom}</TableCell>
                      <TableCell>{resultat.note}</TableCell>
                      <Can
                               role={user.role}
                               perform="resultat:edit"
                               
                               data={{
                                 userId: user.name,
                                 postOwnerId:resultat.coursSuivi.cours.professeur.prenom+" "+resultat.coursSuivi.cours.professeur.nom
                               }}
                               yes={() => ( 
                      <TableCell>
                 
                      <ButtonGroup disableElevation variant="contained" color="primary">
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.editToggle.bind(this, resultat.id,resultat.coursSuivi.cours.nom,resultat.coursSuivi.etudiant.nom,resultat.note)}
                      startIcon={<EditIcon />}
                    >
                      modifier
                    </Button>
                      
                      
                      <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.deleteResultat.bind(
                        this,
                        resultat.id
                      )}
                      startIcon={<DeleteIcon />}>
                   
                      supprimer
                    </Button>
                    </ButtonGroup>
                               
                      </TableCell>
                      )}/>
                    </TableRow>
                               )}/>
                  ))
                )}
              </TableBody>
            </Table>
            </Paper>
          </Card.Body>
        </Card>
      </div>
        ):(<Redirect to="/"/>)}
        </AuthConsumer>
    );
  }
}
