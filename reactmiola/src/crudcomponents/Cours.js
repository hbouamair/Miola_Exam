import React, { Component } from 'react';
import { ButtonGroup, Button, Card, Table, ModalBody } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import MyToast from '../components/MyToast'
import { Modal,ModalHeader,Label,Row,Col} from 'reactstrap';
import {Control , LocalForm } from 'react-redux-form'
export default class Cours extends Component {
    constructor(props) {
        super(props);
        this.state={
          isModalOpen: false,
          coursId:null,
          nom:null,
          nomProf:null,
          addOrEdit:false
      }
      this.toggleModal=this.toggleModal.bind(this);
      //this.handleSubmit=this.handleSubmit.bind(this);
      this.add=this.add.bind(this);
      this.edit=this.edit.bind(this);
      this.editToggle=this.editToggle.bind(this);
      this.addToggle=this.addToggle.bind(this);

        this.state = { courses: [] };
    }
    toggleModal = (coursId,nom,prof) =>{
      console.log(prof);
      this.setState({
          isModalOpen: !this.state.isModalOpen,
          nom:nom,
          nomProf:prof,
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
  editToggle=(coursId,nom,prof) => {
    this.edit();
    this.toggleModal(coursId,nom,prof);
  }
  
  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.coursId);
    this.props.updateCours(state.coursId,values.nom,values.professeurNom)
}*/
    componentDidMount() {
        fetch('http://localhost:4001/courses')
            .then((response) => response.json())
            .then((responseData) => {
              console.log("test  "+responseData);
                this.setState({
                    courses: responseData
                });
            })
            .catch(err => console.error(err));
    }
    deleteCours = (coursId) => {
      axios.delete("http://localhost:4001/courses/"+coursId)
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
        this.props.postCours(values.nom,values.professeurNom)
      }
      else{
        const options ={
          method: 'put',
          url:'http://localhost:4001/courses/'+state.coursId,
          data: {
            nom:values.nom,
            professeurNom:values.professeurNom
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
                            <Control.text model=".professeurNom" className="form-control" id="professeurNom" name="professeurNom" defaultValue={this.state.nomProf}/>
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
                  <MyToast children = {{show:this.state.show, message:"Cours supprimée avec succès.", type:"danger"}}/>
                </div>
            <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faList} /> Liste des Cours
                <div style={{float: 'right'}}>
                  <Button onClick={this.addToggle}>Ajouter un cours</Button>
                </div>
              </Card.Header>
            <Card.Body>
            <Table bordered hover striped variant="dark"><thead>
                <tr>
                    <th>Nom du cours</th>
                    <th>Professeur</th></tr>
            </thead>
            <tbody>
            {    this.state.courses.length ===0 ?
                  <tr align="center">
                      <td colSpan="6">
                       Aucune Cours disponible.</td>
                      </tr> :
                    this.state.courses.map((cours) => (
                      <tr key={cours.id}>
                      <td>{cours.nom}</td>
                      <td>{cours.professeur.nom}</td>
                      <td>
                          <ButtonGroup>
                          <Button size="sm" variant="outline-primary" onClick={this.editToggle.bind(this,cours.id,cours.nom,cours.professeur.nom)}>
                          <FontAwesomeIcon icon={faEdit} />
                          </Button>{' '}
                          <Button size="sm" variant="outline-danger"
                          onClick={this.deleteCours.bind(this,cours.id)}>
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
