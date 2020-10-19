import React, { Component } from "react";
import { Card, ModalBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MyToast from "../components/MyToast";
import Button from "@material-ui/core/Button";
import { Modal, ModalHeader, Label, Row, Col } from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import { AuthConsumer } from "../authContext";
import { Redirect } from "react-router-dom";
import Can from "../components/Can";

export default class Etudiants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      etudiantId: null,
      addOrEdit: false,
      etudiant: null,
      nom: null,
      prenom: null,
      etudiants: [],
      courses: [],
      coursesAdded: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.addToggle = this.addToggle.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }
  toggleModal = (etudiantId, etudiant, nom, prenom) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      etudiantId: etudiantId,
      etudiant: etudiant,
      nom: nom,
      prenom: prenom,
    });
  };
  add = () => {
    this.setState({
      addOrEdit: true,
      coursesAdded: this.state.courses.map((cours) => {
        var nom = cours.nom;
        return { nom, isChecked: false };
      }),
    });
  };
  edit = (etudiant) => {
    this.setState({
      addOrEdit: false,
      coursesAdded: this.state.courses.map((cours) => {
        var nom = cours.nom;
        var checked = false;
        etudiant.courssuivi.map((courssuivi) => {
          if (courssuivi.cours.nom === nom) checked = true;
        });
        return { nom, isChecked: checked };
      }),
    });
  };
  addToggle = () => {
    this.add();
    this.toggleModal();
  };
  editToggle = (etudiantId, etudiant, nom, prenom) => {
    //console.log("etudiantId" + etudiantId)

    this.edit(etudiant);
    this.toggleModal(etudiantId, etudiant, nom, prenom);
  };

  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.etudiantId);
    this.props.updateEtudiant(state.etudiantId,values.nom,values.prenom)
}*/
  componentDidMount() {
    fetch("http://localhost:8080/etudiants")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          etudiants: responseData,
        });
      })
      .catch((err) => console.error(err));
    fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          courses: responseData,
        });
      })
      .catch((err) => console.error(err));
  }
  deleteEtudiant = (etudiantId) => {
    axios
      .delete("http://localhost:8080/etudiants/" + etudiantId)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            etudiants: this.state.etudiants.filter(
              (etudiant) => etudiant.id !== etudiantId
            ),
          });
          alert("etudiant supprimée avec succès.");
        } else {
          alert("pas de suppression.");
        }
      });
  };
  handleEtudiant = (values, state) => {
    //console.log(this.state.addOrEdit + this.state.etudiantId);
    var coursPost = this.state.coursesAdded
      .filter((cours) => {
        return cours.isChecked;
      })
      .map((cours) => {
        //var noms=salle.nom;
        return cours.nom;
      });

    if (this.state.addOrEdit === true) {
      this.props.postEtudiant(values.nom, values.prenom, coursPost);
    } else {
      const options = {
        method: "put",
        url: "http://localhost:8080/etudiants/" + state.etudiantId,
        data: {
          nom: values.nom,
          prenom: values.prenom,
          coursNoms: coursPost,
        },
        headers: {
          "Content-Type": "application/json",
          Action: "put-etud-cours",
        },
      };
      axios(options);
    }
    setTimeout(() => {
      this.props.fetchEtudiants();
    }, 1000);
  };

  handleCheckBox = (nomCours) => (event) => {
    var courses = this.state.coursesAdded;
    courses.forEach((cours) => {
      if (cours.nom === event.target.value)
        cours.isChecked = event.target.checked;
    });
    this.setState({ coursesAdded: courses }, () =>
      console.log(this.state.coursesAdded)
    );
  };

  render() {
    const Checkbox = (nomCours) => {
      var nom = nomCours.nomCours;
      //console.log(nom)
      var i;
      for (i = 0; i < this.state.coursesAdded.length; i++) {
        //console.log(this.state.sallesAdded[i].nom,nom)
        if (this.state.coursesAdded[i].nom === nom) break;
      }
      //console.log(i);
      return (
        <Row className="form-group">
          <Col md={{ size: 10 }}>
            <label>
              {nomCours.nomCours}{" "}
              <input
                label="testlab"
                type="checkbox"
                name="xx"
                value={nom}
                defaultChecked={this.state.coursesAdded[i].isChecked}
                onChange={this.handleCheckBox(
                  nom
                )} /* defaultChecked={this.isChecked.bind(this,nom)}*/
              />
            </label>
          </Col>
        </Row>
      );
    };

    const Modalle = () => {
      return (
        <div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Etudiant</ModalHeader>
            <ModalBody>
              <LocalForm
                onSubmit={(values) => this.handleEtudiant(values, this.state)}
              >
                <Row className="form-group">
                  <Label htmlFor="Cours" md={5}>
                    Cours
                  </Label>
                  {this.state.courses.map((cours) => (
                    <>
                      {/*console.log(nomSalle)*/}
                      <FormGroup>
                        <Checkbox
                          inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                          nomCours={cours.nom}
                        />
                      </FormGroup>
                    </>
                  ))}
                </Row>
                <Row className="form-group">
                  <Label htmlFor="Name" md={4}>
                    Nom
                  </Label>
                  <Col md={7}>
                    <Control.text
                      model=".nom"
                      className="form-control"
                      id="nom"
                      name="nom"
                      defaultValue={this.state.nom}
                      required
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="Name" md={4}>
                    Prenom
                  </Label>
                  <Col md={7}>
                    <Control.text
                      model=".prenom"
                      className="form-control"
                      id="prenom"
                      name="prenom"
                      defaultValue={this.state.prenom}
                      required
                    />
                  </Col>
                </Row>
                
                <Row classname="form-group">
                  <Col md={{ size: 10 }}>
                    <Button variant="contained" color="primary" type="submit">
                      Enregistrer
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
                    message: "Etudiant supprimée avec succès.",
                    type: "danger",
                  }}
                />
              </div>
              <Card className={"border border-dark bg-light text-black"}>
                <Card.Header>
                  <FontAwesomeIcon icon={faList} /> {""}
                  <strong className="head">Liste des Etudiants</strong>
                  <Can
                               role={user.role}
                               perform="etudiant:add"
                               data={{
                                 userId: user.id,
                               }}
                               yes={() => (
                  <div style={{ float: "right" }}>
                    <Fab
                      onClick={this.addToggle}
                      color="primary"
                      aria-label="add"
                    >
                      <AddIcon />
                    </Fab>
                  </div>)}
                  />
                </Card.Header>
                <Card.Body>
                  <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Nom</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Prenom</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Cours</strong>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {this.state.etudiants.length === 0 ? (
                          <TableRow align="center">
                            <TableCell colSpan="6">
                              Aucun Etudiant disponible.
                            </TableCell>
                          </TableRow>
                        ) : (
                          this.state.etudiants.map((etudiant) => (
                            <TableRow key={etudiant.id}>
                              <TableCell>{etudiant.nom}</TableCell>
                              <TableCell>{etudiant.prenom}</TableCell>
                              <TableCell>
                                {etudiant.courssuivi.map((courssuivi) => (
                                  <>
                                    <TableCell>
                                      {courssuivi.cours.nom}
                                    </TableCell>
                                  </>
                                ))}
                              </TableCell>
                              <Can
                               role={user.role}
                               perform="etudiant:edit"
                               data={{
                                 userId: user.id,
                               }}
                               yes={() => (
                              <TableCell>
                                <ButtonGroup
                                  disableElevation
                                  variant="contained"
                                  color="primary"
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.editToggle.bind(
                                      this,
                                      etudiant.id,
                                      etudiant,
                                      etudiant.nom,
                                      etudiant.prenom
                                    )}
                                    startIcon={<EditIcon />}
                                  >
                                    modifier
                                  </Button>

                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.deleteEtudiant.bind(
                                      this,
                                      etudiant.id
                                    )}
                                    startIcon={<DeleteIcon />}
                                  >
                                    supprimer
                                  </Button>
                                </ButtonGroup>
                              </TableCell>)}/>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </Paper>
                </Card.Body>
              </Card>
            </div>
          ) : (
            <Redirect to="/" />
          )
        }
      </AuthConsumer>
    );
  }
}
