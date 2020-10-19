import React, { Component } from 'react';
import {  Card, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from '../components/MyToast'
import { Modal,ModalHeader,Label,Row,Col} from 'reactstrap';
import {Control , LocalForm } from 'react-redux-form'
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
import { AuthConsumer } from '../authContext';
import { Redirect } from "react-router-dom";
import Can from '../components/Can';

export default class Cours extends Component {
    constructor(props) {
        super(props);
        this.state={
          isModalOpen: false,
          coursId:null,
          nom:null,
          nomProf:null,
          addOrEdit:false,
          courses: [],
          professeurs:[],
          etudiants: []
      }
      this.toggleModal=this.toggleModal.bind(this);
      //this.handleSubmit=this.handleSubmit.bind(this);
      this.add=this.add.bind(this);
      this.edit=this.edit.bind(this);
      this.editToggle=this.editToggle.bind(this);
      this.addToggle=this.addToggle.bind(this);
      this.handleRadio=this.handleRadio.bind(this);
      this.disableRadio=this.disableRadio.bind(this);
    }
    toggleModal = (coursId,nom,nomProf) =>{
      console.log(nomProf);
      this.setState({
          isModalOpen: !this.state.isModalOpen,
          nom:nom,
          nomProf:nomProf,
          coursId: coursId
      });
  }
  add = () =>{
    this.setState({
      addOrEdit : true,
    });
  }
  edit =() =>{
    this.setState({
      addOrEdit : false,
    });
  }
  addToggle=() =>{
    this.add();
    this.toggleModal();
  }
  editToggle=(coursId,nom,nomProf) => {
    console.log(nom+nomProf);
    this.edit();
    this.toggleModal(coursId,nom,nomProf);
  }

  handleRadio(event){
    console.log(event.target.value);
    this.setState({nomProf:event.target.value})
  }

  disableRadio(nomProf){
    var bool=false;
    if(this.state.addOrEdit===true){
      this.state.courses.map((cours)=>{
        if(cours.professeur.nom===nomProf) bool=true;
      })
    }
    else{
      this.state.courses.map((cours)=>{
        console.log(this.state.nomProf);
        if(cours.professeur.nom===nomProf && cours.professeur.nom!==this.state.nomProf) bool=true;
      })
    }
    console.log(bool);
    return bool;
  }
  
  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.coursId);
    this.props.updateCours(state.coursId,values.nom,values.professeurNom)
}*/
    componentDidMount() {
        fetch('http://localhost:8080/courses')
            .then((response) => response.json())
            .then((responseData) => {
              console.log("test  "+responseData);
                this.setState({
                    courses: responseData
                });
            })
            .catch(err => console.error(err));
            fetch("http://localhost:8080/etudiants")
            .then((response) => response.json())
            .then((responseData) => {
              //console.log("test  "+responseData);
              this.setState({
                etudiants: responseData,
              });
            })
            .catch((err) => console.error(err));
            fetch('http://localhost:8080/professeurs')
            .then((response) => response.json())
            .then((responseData) => {
              console.log("test  "+responseData);
                this.setState({
                    professeurs: responseData
                });
            })
            .catch(err => console.error(err));
    }    choisiretudiant(name, courname) {
      let cour=null;  
      this.state.etudiants.map((etudiant) => {
        if (etudiant.prenom + " " + etudiant.nom === name) {
          etudiant.courssuivi.map((cours) => {
            console.log(cours.cours.nom === courname);
                if(cours.cours.nom === courname){
                  cour=courname;
                }
            
          });
        }
      });
      
      return cour;
    }
    deleteCours = (coursId) => {
      axios.delete("http://localhost:8080/courses/"+coursId)
        .then(response => {
          if(response.data != null){
            this.setState({"show":true});
            setTimeout(() => this.setState({"show":false}), 3000);
            this.setState({
              courses: this.state.courses.filter(cours => cours.id !== coursId)
            });
            alert("Cours supprimée avec succès.");
          } else {
            alert("pas de suppression.");
          }
        });
  };
  handleCours = (values,state) => {
    //console.log(this.state.addOrEdit + this.state.coursId);
    if (this.state.addOrEdit===true){
      this.props.postCours(values.nom,this.state.nomProf)
    }
    else{
      const options ={
        method: 'put',
        url:'http://localhost:8080/courses/'+state.coursId,
        data: {
          nom:values.nom,
          professeurNom:this.state.nomProf
        },
        headers: {
          'Content-Type': 'application/json',
          'Action': 'put-nom-prof',
      },
      }
      axios(options)
      
    }
    setTimeout(() =>{
      this.props.fetchCourses();
    },1000)
  }

  render() {

    


    const Modalle =()=>{
      console.log(this.state.nom);
      return(
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
              <LocalForm onSubmit={(values)=>this.handleCours(values,this.state)}>
                  <Row className="form-group">
                      <Label htmlFor="Name" md={12}>Nom de cours</Label>
                      <Col md={12}>
                          <Control.text model=".nom" className="form-control" id="nom" name="nom" 
                              defaultValue={this.state.nom}/>
                      </Col>
                  </Row>
                  <Row className="form-group">
                      <Label htmlFor="Name" md={12}>Nom du professeur</Label>
                      <Col md={12}>
                      {this.state.professeurs.map((professeur)=>
                      
                      <div onChange={this.handleRadio}>
                      <input type="radio" checked={this.state.nomProf===professeur.nom} value={professeur.nom} name="cours"  /> {professeur.nom}
                    </div>
                    )}
                      </Col>
                  </Row>
                  <Row classname="form-group">
                     <Col md={{size:10}}>
                         <Button type="submit" color="primary" variant="contained">
                             Submit
                         </Button>
                     </Col>
                  </Row>
              </LocalForm>
          </ModalBody>
      </Modal>
      </div>
      )
    }
      return (
        <AuthConsumer>
        {({ authenticated, user }) =>
          authenticated ? (
        <div className="container py-5">
          <Modalle/>
          <div style={{"display":this.state.show ? "block" : "none"}}>
                  <MyToast children = {{show:this.state.show, message:"Cours supprimée avec succès.", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-light text-black"}>
            <Card.Header>
            
              <FontAwesomeIcon icon={faList} />{''}<strong className="head"> Liste des Cours</strong>
              <Can
                               role={user.role}
                               perform="cour:add"
                               data={{
                                 userId: user.id,
                               }}
                               yes={() => ( 
                <div style={{float: 'right'}}>
                <Fab  onClick={this.addToggle} color="primary" aria-label="add">
                <AddIcon />
               </Fab>
                </div>)}/>
              </Card.Header>
            <Card.Body>
            <Paper>
            <Table ><TableHead>
                <TableRow>
                    <TableCell><strong>Nom du cours</strong></TableCell>
                    <TableCell><strong>Professeur</strong></TableCell>
                    <TableCell></TableCell></TableRow>
            </TableHead>
            <TableBody>
            {    this.state.courses.length ===0 ?
                  <TableRow align="center">
                      <TableCell colSpan="6">
                       Aucune Cours disponible.</TableCell>
                      </TableRow> :
                    this.state.courses.map((cours) => (
                      <Can
                      role={user.role}
                      perform="cour:view"
                      data={{
                        userId: user.name,
                        postOwnerId:cours.professeur.prenom+" "+cours.professeur.nom,
                        nom: this.choisiretudiant(
                          user.name,
                          cours.nom
                        ),
                        cournom:cours.nom
                      }}
                      yes={() => ( 
                      <TableRow key={cours.id}>
                      <TableCell>{cours.nom}</TableCell>
                      <TableCell>{cours.professeur.nom}</TableCell>
                      <Can
                               role={user.role}
                               perform="cour:add"
                               data={{
                                 userId: user.id,
                               }}
                               yes={() => ( 
                      <TableCell>
                      <ButtonGroup disableElevation variant="contained" color="primary">
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.editToggle.bind(this,cours.id,cours.nom,cours.professeur.nom)}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                      
                      
                      <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.deleteCours.bind(this,cours.id)}
                      startIcon={<DeleteIcon />}>
                   
                      Delete
                    </Button>
                    </ButtonGroup>
                          
                      </TableCell>
                               )}/>
                      </TableRow>
                      )}/>
                    ))
                  }
                    </TableBody>
                    </Table>
                    </Paper>
              </Card.Body>
              </Card>
            </div>):(<Redirect to="/"/>)}
            </AuthConsumer>
        );
    }
}
