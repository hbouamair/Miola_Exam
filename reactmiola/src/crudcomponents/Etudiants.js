import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from '../components/MyToast'
import { Modal,ModalHeader,Label,Row,Col} from 'reactstrap';
import {Control , LocalForm } from 'react-redux-form'
export default class Etudiants extends Component {
    constructor(props) {
        super(props);
        this.state={
          isModalOpen: false,
          etudiantId:null,
          addOrEdit:false
      }
      this.toggleModal=this.toggleModal.bind(this);
      //this.handleSubmit=this.handleSubmit.bind(this);
      this.add=this.add.bind(this);
      this.edit=this.edit.bind(this);
      this.editToggle=this.editToggle.bind(this);
      this.addToggle=this.addToggle.bind(this);

        this.state = { etudiants: [] };
    }
    toggleModal = (etudiantId) =>{
      this.setState({
          isModalOpen: !this.state.isModalOpen,
          etudiantId: etudiantId
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
  editToggle=(etudiantId) => {
    console.log("etudiantId" + etudiantId)
    this.edit();
    this.toggleModal(etudiantId);
  }
  
  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.etudiantId);
    this.props.updateEtudiant(state.etudiantId,values.nom,values.prenom)
}*/
    componentDidMount() {
        fetch('http://localhost:4001/etudiants')
            .then((response) => response.json())
            .then((responseData) => {
              console.log("test  "+responseData);
                this.setState({
                    etudiants: responseData
                });
            })
            .catch(err => console.error(err));
    }
    deleteEtudiant = (etudiantId) => {
      axios.delete("http://localhost:4001/etudiants/"+etudiantId)
        .then(response => {
          if(response.data != null){
            this.setState({"show":true});
            setTimeout(() => this.setState({"show":false}), 3000);
            this.setState({
              etudiants: this.state.etudiants.filter(etudiant => etudiant.id !== etudiantId)
            });
            alert("etudiant supprimée avec succès.");
          } else {
            alert("pas de suppression.");
          }
        });
  };
    handleEtudiant = (values,state) => {
      console.log(this.state.addOrEdit + this.state.etudiantId);
      if (this.state.addOrEdit===true){
        this.props.postEtudiant(values.nom,values.prenom)
      }
      else{
        const options ={
          method: 'put',
          url:'http://localhost:4001/etudiants/'+state.etudiantId,
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
        this.props.fetchEtudiants();
      },1000)
    }

    render() {
      const Modalle =()=>{
        return(
          <div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleEtudiant(values,this.state)}>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={12}>Nom</Label>
                        <Col md={12}>
                            <Control.text model=".nom" className="form-control" id="nom" name="nom" 
                                placeholder="Nom" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={12}>Prenom</Label>
                        <Col md={12}>
                            <Control.text model=".prenom" className="form-control" id="prenom" name="prenom" />
                        </Col>
                    </Row>
                    <Row classname="form-group">
                       <Col md={{size:10}}>
                           <Button type="submit" color="primary">
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
        <div>
          <Modalle/>
          <div style={{"display":this.state.show ? "block" : "none"}}>
                  <MyToast children = {{show:this.state.show, message:"Etudiant supprimée avec succès.", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faList} /> Liste des Etudiants
                <div style={{float: 'right'}}>
                  <Button onClick={this.addToggle}>Ajouter un etudiant</Button>
                </div>
              </Card.Header>
            <Card.Body>
            <Table bordered hover striped variant="dark"><thead>
                <tr>
                    <th>Nom</th>
                    <th>Prenom</th></tr>
            </thead>
            <tbody>
            {    this.state.etudiants.length ===0 ?
                  <tr align="center">
                      <td colSpan="6">
                       Aucun Etudiant disponible.</td>
                      </tr> :
                    this.state.etudiants.map((etudiant) => (
                      <tr key={etudiant.id}>
                      <td>{etudiant.nom}</td>
                      <td>{etudiant.prenom}</td>
                      <td>
                          <ButtonGroup>
                          <Button size="sm" variant="outline-primary" onClick={this.editToggle.bind(this,etudiant.id)}>
                          <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button size="sm" variant="outline-danger"
                          onClick={this.deleteEtudiant.bind(this,etudiant.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                          </Button>
                          </ButtonGroup>
                      </td>
                      </tr>
                    ))
                  }
                    </tbody>
                    </Table>
              </Card.Body>
              </Card>
            </div>
        );
    }
}
