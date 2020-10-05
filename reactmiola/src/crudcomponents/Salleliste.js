import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from '../components/MyToast'
import { Modal,ModalHeader,Label,Row,Col} from 'reactstrap';
import {Control , LocalForm } from 'react-redux-form'
export default class SalleList extends Component {
    constructor(props) {
        super(props);
        this.state={
          isModalOpen: false,
          salleId:null,
          addOrEdit:false
      }
      this.toggleModal=this.toggleModal.bind(this);
      //this.handleSubmit=this.handleSubmit.bind(this);
      this.add=this.add.bind(this);
      this.edit=this.edit.bind(this);
      this.editToggle=this.editToggle.bind(this);
      this.addToggle=this.addToggle.bind(this);

        this.state = { salles: [] };
    }
    toggleModal = (salleId) =>{
      this.setState({
          isModalOpen: !this.state.isModalOpen,
          salleId: salleId
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
  editToggle=(salleId) => {
    console.log("salleid" + salleId)
    this.edit();
    this.toggleModal(salleId);
  }
  
  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.salleId);
    this.props.updateSalle(state.salleId,values.nom,values.nbPlaces)
}*/
    componentDidMount() {
        fetch('http://localhost:4001/salles')
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
      axios.delete("http://localhost:4001/salles/"+salleId)
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
          url:'http://localhost:4001/salles/'+state.salleId,
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
            <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values)=>this.handleSalle(values,this.state)}>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={12}>Nom de salle</Label>
                        <Col md={12}>
                            <Control.text model=".nom" className="form-control" id="nom" name="nom" 
                                placeholder="Nom" />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="Name" md={12}>Nombre de places</Label>
                        <Col md={12}>
                            <Control.text model=".nbPlaces" className="form-control" id="nbPlaces" name="nbPlaces" />
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
                  <MyToast children = {{show:this.state.show, message:"Salle supprimée avec succès.", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faList} /> Liste des Salles
                <div style={{float: 'right'}}>
                  <Button onClick={this.addToggle}>Ajouter une salle</Button>
                </div>
              </Card.Header>
            <Card.Body>
            <Table bordered hover striped variant="dark"><thead>
                <tr>
                    <th>Nom</th>
                    <th>Nombre de places</th></tr>
            </thead>
            <tbody>
            {    this.state.salles.length ===0 ?
                  <tr align="center">
                      <td colSpan="6">
                       Aucune Salle disponible.</td>
                      </tr> :
                    this.state.salles.map((salle) => (
                      <tr key={salle.id}>
                      <td>{salle.nom}</td>
                      <td>{salle.nbPlaces}</td>
                      <td>
                          <ButtonGroup>
                          <Button size="sm" variant="outline-primary" onClick={this.editToggle.bind(this,salle.id)}>
                          <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button size="sm" variant="outline-danger"
                          onClick={this.deleteSalle.bind(this,salle.id)}>
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
