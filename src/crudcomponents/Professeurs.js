import React, { Component } from 'react';
import { Card, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from '../components/MyToast'
import Button from '@material-ui/core/Button';
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
import { Redirect } from "react-router-dom";
import { AuthConsumer } from '../authContext';

export default class Professeurs extends Component {
    constructor(props) {
        super(props);
        this.state={
          isModalOpen: false,
          professeurId:null,
          addOrEdit:false,
          nom:null,
          prenom:null
      }
      this.toggleModal=this.toggleModal.bind(this);
      //this.handleSubmit=this.handleSubmit.bind(this);
      this.add=this.add.bind(this);
      this.edit=this.edit.bind(this);
      this.editToggle=this.editToggle.bind(this);
      this.addToggle=this.addToggle.bind(this);

        this.state = { professeurs: [] };
    }
    toggleModal = (professeurId, nom, prenom) =>{
      this.setState({
          isModalOpen: !this.state.isModalOpen,
          professeurId: professeurId,
          nom:nom,
          prenom:prenom
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
  editToggle=(professeurId,nom,prenom) => {
    console.log("professeurId" + professeurId)
    this.edit();
    this.toggleModal(professeurId,nom,prenom);
  }
  
  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.professeurId);
    this.props.updateProfesseur(state.professeurId,values.nom,values.prenom)
}*/
    componentDidMount() {
        fetch('http://localhost:8080/professeurs')
            .then((response) => response.json())
            .then((responseData) => {
              console.log("test  "+responseData);
                this.setState({
                    professeurs: responseData
                });
            })
            .catch(err => console.error(err));
    }
    deleteProfesseur = (professeurId) => {
      axios.delete("http://localhost:8080/professeurs/"+professeurId)
        .then(response => {
          if(response.data != null){
            this.setState({"show":true});
            setTimeout(() => this.setState({"show":false}), 3000);
            this.setState({
              professeurs: this.state.professeurs.filter(professeur => professeur.id !== professeurId)
            });
            alert("professeur supprimée avec succès.");
          } else {
            alert("pas de suppression.");
          }
        });
  };
    handleProfesseur = (values,state) => {
      console.log(this.state.addOrEdit + this.state.professeurId);
      if (this.state.addOrEdit===true){
        this.props.postProfesseur(values.nom,values.prenom)
      }
      else{
        const options ={
          method: 'put',
          url:'http://localhost:8080/professeurs/'+state.professeurId,
          data: {
            nom:values.nom,
            prenom:values.prenom
          },
          headers: {
            'Content-Type': 'application/json',
        },
        }
        axios(options)
        
      }
      setTimeout(() =>{
        this.props.fetchProfesseurs();
      },1000)

    }

    render() {
      const Modalle =()=>{
        return(
          <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Professeur</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleProfesseur(values,this.state)}>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={4}>Nom</Label>
                        <Col md={7}>
                            <Control.text model=".nom" className="form-control" id="nom" name="nom" 
                                placeholder="Nom" defaultValue={this.state.nom}/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={4}>Prenom</Label>
                        <Col md={7}>
                            <Control.text model=".prenom" className="form-control" id="prenom" name="prenom" defaultValue={this.state.prenom} />
                        </Col>
                    </Row>
                    <Row classname="form-group">
                       <Col md={{size:10}}>
                           <Button   variant="contained"
                           color="primary"
                           type="submit">
                               Enregistrer
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
                  <MyToast children = {{show:this.state.show, message:"Professeur supprimée avec succès.", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-light text-black"}>
            <Card.Header>
              <FontAwesomeIcon icon={faList} /> {''}<strong className="head">Liste des Professeurs</strong> 
                <div style={{float: 'right'}}>
                <Fab  onClick={this.addToggle} color="primary" aria-label="add">
                <AddIcon />
               </Fab>
                </div>
              </Card.Header>
            <Card.Body>
            <Paper>
            <Table ><TableHead>
                <TableRow>
                    <TableCell><strong>Nom</strong></TableCell>
                    <TableCell><strong>Prenom</strong></TableCell>
                    <TableCell></TableCell>
                    </TableRow>
            </TableHead>
            <TableBody>
            {    this.state.professeurs.length ===0 ?
                  <TableRow align="center">
                      <td colSpan="6">
                       Aucun Professeur disponible.</td>
                      </TableRow> :
                    this.state.professeurs.map((professeur) => (
                      <TableRow key={professeur.id}>
                      <TableCell>{professeur.nom}</TableCell>
                      <TableCell>{professeur.prenom}</TableCell>
                      <TableCell>
                      <ButtonGroup disableElevation variant="contained" color="primary">
                      <Button
                      variant="contained"
                      color="primary"
                      onClick={this.editToggle.bind(this,professeur.id, professeur.nom,professeur.prenom)}
                      startIcon={<EditIcon />}
                    >
                      modifier
                    </Button>
                      
                      
                      <Button
                      variant="contained"
                      color="secondary"
                      onClick={this.deleteProfesseur.bind(this,professeur.id)}
                      startIcon={<DeleteIcon />}>
                   
                      Supprimer
                    </Button>
                    </ButtonGroup>




                          
                      </TableCell>
                      </TableRow>
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
