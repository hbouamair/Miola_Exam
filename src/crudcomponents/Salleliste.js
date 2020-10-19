import React, { Component } from 'react';
import {   Card, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MyToast from '../components/MyToast'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Modal,ModalHeader,Label,Row,Col} from 'reactstrap';
import {Control , LocalForm } from 'react-redux-form';
import Button from '@material-ui/core/Button';
import { AuthConsumer } from '../authContext';
import Can from '../components/Can';
import { Redirect } from "react-router-dom";
export default class SalleList extends Component {
    constructor(props) {
        super(props);
        this.state={
          isModalOpen: false,
          salleId:null,
          addOrEdit:false,
          nbPlaces:null,
          nom:null
      }
      this.toggleModal=this.toggleModal.bind(this);
      //this.handleSubmit=this.handleSubmit.bind(this);
      this.add=this.add.bind(this);
      this.edit=this.edit.bind(this);
      this.editToggle=this.editToggle.bind(this);
      this.addToggle=this.addToggle.bind(this);

        this.state = { salles: [] };
    }
    toggleModal = (salleId,nom,nbPlaces) =>{
      this.setState({
          isModalOpen: !this.state.isModalOpen,
          salleId: salleId,
          nom:nom,
          nbPlaces:nbPlaces
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
  editToggle=(salleId,nom, nbPlaces) => {
    console.log("salleid" + salleId)
    this.edit();
    this.toggleModal(salleId, nom, nbPlaces);
  }
  
  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.salleId);
    this.props.updateSalle(state.salleId,values.nom,values.nbPlaces)
}*/
    componentDidMount() {
        fetch('http://localhost:8080/salles')
            .then((response) => response.json())
            .then((responseData) => {
              console.log("test  "+responseData);
                this.setState({
                    salles: responseData
                });
            })
            .catch(err => console.error(err));
    }
    deleteSalle = (salleId) => {
      axios.delete("http://localhost:8080/salles/"+salleId)
        .then(response => {
          if(response.data != null){
            this.setState({"show":true});
            setTimeout(() => this.setState({"show":false}), 3000);
            this.setState({
              salles: this.state.salles.filter(salle => salle.id !== salleId)
            });
            alert("Salle supprimée avec succès.");
          } else {
            alert("pas de suppression.");
          }
        });
  };
    handleSalle = (values,state) => {
      console.log(this.state.addOrEdit + this.state.salleId);
      if (this.state.addOrEdit===true){
        this.props.postSalle(values.nom,values.nbPlaces)
      }
      else{
        const options ={
          method: 'put',
          url:'http://localhost:8080/salles/'+state.salleId,
          data: {
            nom:values.nom,
            nbPlaces:values.nbPlaces
          },
          headers: {
            'Content-Type': 'application/json',
        },
        }
        axios(options)
        
      }
      setTimeout(() =>{
        this.props.fetchSalles();
      },1000)
    }

    render() {
      const Modalle =()=>{
        return(
          
          <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Salle</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSalle(values,this.state)}>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={12}>Nom de salle</Label>
                        <Col md={12}>
                            <Control.text model=".nom" className="form-control" id="nom" name="nom" 
                                placeholder="Nom..." defaultValue={this.state.nom}required/>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={12}>Nombre de places</Label>
                        <Col md={12}>
                            <Control.text model=".nbPlaces" type="number" min="0" className="form-control" id="nbPlaces" name="nbPlaces" placeholder="ex:30..." defaultValue={this.state.nbPlaces} required />
                        </Col>
                    </Row>
                    <Row classname="form-group">
                       <Col md={{size:10}}>
                       <Button
                       variant="contained"
                       color="primary"
                       type="submit"
                      
                       
                     >
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
        {({ authenticated, user}) =>
               authenticated ? (
     <Can
     role={user.role}
     perform="salle:edit"
     data={{
       userId: user.id,
     }}
     yes={() => (

        <div className="container py-5">
          <Modalle/>
          <div style={{"display":this.state.show ? "block" : "none"}}>
                  <MyToast children = {{show:this.state.show, message:"Salle supprimée avec succès.", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-light text-black"}>
            <Card.Header>
              <FontAwesomeIcon icon={faList} /> {''} <strong className="head">Liste des Salles</strong>
                <div style={{float: 'right'}}>
                <Fab  onClick={this.addToggle} color="primary" aria-label="add">
                <AddIcon />
               </Fab>
                </div>
              </Card.Header>
            <Card.Body>
            <Paper>
            <Table bordered hover striped variant="dark"><TableHead>
            <TableRow>
            <TableCell><strong>Nom</strong></TableCell>
            <TableCell><strong>Nombre de places</strong></TableCell>
            <TableCell></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {    this.state.salles.length ===0 ?
              <TableRow align="center">
              <TableCell colSpan="6">
               Aucune salle disponible.</TableCell>
              </TableRow> :
                    this.state.salles.map((salle) => (
                      <TableRow key={salle.id} >
                      <TableCell > {salle.nom}</TableCell>
                      <TableCell>{salle.nbPlaces}</TableCell>
                      <TableCell>
                          <ButtonGroup disableElevation variant="contained" color="primary">
                  <Button
                  variant="contained"
                  color="primary"
                  onClick={this.editToggle.bind(this,salle.id, salle.nom, salle.nbPlaces)}
                  startIcon={<EditIcon />}
                >
                  Modifier
                </Button>
                  
                  
                  <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.deleteSalle.bind(this,salle.id)}
                  startIcon={<DeleteIcon />}
                >
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
            </div>
            )}/>
    
            ):(
              <Redirect to="/"/>
            )}
            </AuthConsumer>
        );
    }
}
