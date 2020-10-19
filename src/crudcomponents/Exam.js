import React, { Component } from "react";
import { Card, ModalBody } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "../components/MyToast";
import { Modal, ModalHeader, Label, Row, Col } from "reactstrap";
import { Control, LocalForm } from "react-redux-form";
import DateFnsUtils from "@date-io/date-fns";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Table from "@material-ui/core/Table";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Redirect } from "react-router-dom";
import Can from "../components/Can";
import { AuthConsumer } from "../authContext";
export default class Exam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      examId: null,
      date: null,
      nomCours: null,
      exam: null,
      precheckedCours: null,
      selectedDate:"Tue Oct 13 2020 00:00:00 GMT+0100 (UTC+01:00)",
      nomsSalles: [],
      nomsSallesExam: [],
      sallesAdded: [],
      courses: [],
      examens: [],
      etudiants: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    //this.handleSubmit=this.handleSubmit.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.addToggle = this.addToggle.bind(this);
    this.disableCheck = this.disableCheck.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.disableRadio = this.disableRadio.bind(this);
  }
  toggleModal = (exam, nomCours) => {
    //var nom=exam.cours.nom;
    //console.log(nom);
    this.setState({
      isModalOpen: !this.state.isModalOpen,
      exam: exam,
      //selectedDate: exam.dateExam,
      nomCours: nomCours,
      precheckedCours: nomCours,
      examId: exam.id,
    });
  };
  add = () => {
    console.log(this.state.nomsSalles);
    this.setState(
      {
        addOrEdit: true,
        sallesAdded: this.state.nomsSalles.map((salle) => {
          var nom = salle;
          return { nom, isChecked: false };
        }),
      },
      () => console.log(this.state.sallesAdded)
    );
  };
  edit = (exam) => {
    console.log(this.state.nomsSalles);
    this.setState(
      {
        addOrEdit: false,
        sallesAdded: this.state.nomsSalles.map((salle) => {
          var nom = salle;
          var checked = false;
          exam.sallesExamen.map((salleExam) => {
            if (salleExam.salle.nom === nom) checked = true;
          });
          //console.log(nom);
          return { nom, isChecked: checked };
        }),
      },
      () => console.log(this.state.sallesAdded)
    );
  };

  addToggle = (exam) => {
    this.add();
    this.toggleModal(exam);
  };
  editToggle = (exam, nomCours) => {
    this.edit(exam);
    console.log(exam);
    this.toggleModal(exam, nomCours);
  };

  handleCheckBox = (nomSalle) => (event) => {
    var salles = this.state.sallesAdded;
    salles.forEach((salle) => {
      if (salle.nom === event.target.value)
        salle.isChecked = event.target.checked;
    });
    this.setState({ sallesAdded: salles }, () =>
      console.log(this.state.sallesAdded)
    );
    //console.log(this.state.sallesAdded);

    /*else{
    var tab2=[];
    this.state.exam.sallesExamen.map((salleExam)=>(
      tab2=[...tab2,salleExam.salle.nom]
    ))
    console.log(tab2.includes(nomSalle));
    //console.log(event.target.checked);
    var sallesAd=this.state.sallesAdded;
      if (tab2.includes(nomSalle)){
        sallesAd.forEach(salle=>{
          //console.log(salle.isChecked);
          if(salle.nom===nomSalle) salle.isChecked=event.target.checked
        })
        this.setState({sallesAdded:sallesAd},()=>console.log(this.state.sallesAdded))
      } ;
    }*/
  };

  disableCheck=(nomSalle)=>{
    console.log(nomSalle);
    var tab=[];
    this.state.nomsSallesExam.forEach(salle=>{
        tab=[...tab,salle]
    })
    //console.log(tab);
    var bool=false;

    this.state.examens.map((examen)=>{
      examen.sallesExamen.map((salleEx)=>{
        if(salleEx.salle.nom===nomSalle){
        console.log(this.state.selectedDate.toString().split(" ")[4].split(":")[0],examen.dateExam.split(" ")[4].split(":")[0]);
        if(this.state.selectedDate.toString().split(" ")[1]===examen.dateExam.split(" ")[1] && this.state.selectedDate.toString().split(" ")[2]===examen.dateExam.split(" ")[2] && this.state.selectedDate.toString().split(" ")[3]===examen.dateExam.split(" ")[3]){
      if(Number(this.state.selectedDate.toString().split(" ")[4].split(":")[0]-examen.dateExam.split(" ")[4].split(":")[0]+1)===0 || Number(this.state.selectedDate.toString().split(" ")[4].split(":")[0]-examen.dateExam.split(" ")[4].split(":")[0]-1===0)|| Number(this.state.selectedDate.toString().split(" ")[4].split(":")[0]-examen.dateExam.split(" ")[4].split(":")[0]===0)) bool=true}
        }
      })
      })
    /*tab.forEach(salle=>{
      if(this.state.selectedDate.split(" ")[4]-salle.examen.dateExam.split(" ")[4]+1 || this.state.selectedDate.split(" ")[4]-salle.dateExam.split(" ")[4]+1) bool=true
      //if(salle===nomSalle) bool=true
    })*/
    console.log(bool);

  return bool
  }

  handleRadio(event) {
    console.log(event.target.value);
    this.setState({ nomCours: event.target.value });
  }

  disableRadio(nomCours) {
    var bool = false;
    if (this.state.addOrEdit === true) {
      this.state.examens.map((exam) => {
        if (exam.cours.nom === nomCours) bool = true;
      });
    } else {
      this.state.examens.map((exam) => {
        console.log(this.state.nomCours);
        if (
          exam.cours.nom === nomCours &&
          exam.cours.nom !== this.state.precheckedCours
        )
          bool = true;
      });
    }
    console.log(bool);
    return bool;
  }

  handleDateChange = (date) => {
    console.log(date);
    this.setState({ selectedDate: date });
  };
  choisiretudiant(name, courname) {
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

  /*handleSubmit(values,state){
    this.toggleModal();
    console.log("Current State is :"+ JSON.stringify(values));
    alert("Current State is :"+ state.examId);
    this.props.updateExam(state.examId,values.nom,values.professeurNom)
}*/

  componentDidMount() {
    fetch("http://localhost:8080/examens")
      .then((response) => response.json())
      .then((responseData) => {
        //console.log("test  "+responseData);
        this.setState({
          examens: responseData,

          nomsSallesExam:responseData.map((exam)=>(
            exam.sallesExamen.map((salleExam)=>(
              salleExam))
          ))
        });
      })
      .catch((err) => console.error(err));
    //console.log(this.state.nomsSalles)
    fetch("http://localhost:8080/courses")
      .then((response) => response.json())
      .then((responseData) => {
        //console.log("test  "+responseData);
        this.setState({
          courses: responseData,
        });
      })
      .catch((err) => console.error(err));
    fetch("http://localhost:8080/etudiants")
      .then((response) => response.json())
      .then((responseData) => {
        //console.log("test  "+responseData);
        this.setState({
          etudiants: responseData,
        });
      })
      .catch((err) => console.error(err));

    fetch("http://localhost:8080/salles")
      .then((response) => response.json())
      .then((responseData) => {
        //console.log("test  "+responseData);
        this.setState({
          nomsSalles: responseData.map((salle) => salle.nom),
        });
      })
      .catch((err) => console.error(err));
  }
  deleteExam = (examen) => {
    axios
      .delete("http://localhost:8080/examens/" + examen.id)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            examens: this.state.examens.filter((exam) => exam.id !== examen.id),
          });
          alert("Exam supprimé avec succès. Confirmez pour actualiser");
          this.props.fetchExams();
    this.props.fetchSalles();
    this.props.fetchCourses();
        } else {
          alert("pas de suppression.");
        }
      });
  };
  handleExam = (values, state) => {
    //console.log(this.state.addOrEdit + this.state.examId);
    var sallesPost = this.state.sallesAdded
      .filter((salle) => {
        return salle.isChecked;
      })
      .map((salle) => {
        //var noms=salle.nom;
        return salle.nom;
      });
    console.log(this.state.selectedDate.toString());
    if (this.state.addOrEdit === true) {
      this.props.postExam(
        this.state.selectedDate.toString(),
        this.state.nomCours,
        sallesPost
      );
    } else {
      const options = {
        method: "put",
        url: "http://localhost:8080/examens/" + state.exam.id,
        data: {
          dateExam: this.state.selectedDate.toString(),
          coursNom: this.state.nomCours,
          sallesNoms: sallesPost,
        },
        headers: {
          "Content-Type": "application/json",
          Action: "put-exam-with-cours-salle-date",
        },
      };
      axios(options);
      alert("Exam modifié avec succès. Confirmez pour actualiser");
    }
    setTimeout(() => {
    this.props.fetchExams();
    this.props.fetchSalles();
    this.props.fetchCourses();
    }, 1000);
  };

  render() {
    const TimePickers = () => {
      return (
        <Grid container justify="space-around">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date d'examen"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Temp d'examen"
              value={this.state.selectedDate}
              onChange={this.handleDateChange}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      );
    };

    const Checkbox = (nomSalle) => {
      var nom = nomSalle.nomSalle;
      //console.log(nom)
      var i;
      for (i = 0; i < this.state.sallesAdded.length; i++) {
        //console.log(this.state.sallesAdded[i].nom,nom)
        if (this.state.sallesAdded[i].nom === nom) break;
      }
      //console.log(i);
      return (
        <Row className="form-group">
          <Col md={{ size: 10 }}>
            <label>
              {nomSalle.nomSalle}{" "}
              <input
                label="testlab"
                type="checkbox"
                name="xx"
                value={nom}
                defaultChecked={this.state.sallesAdded[i].isChecked}
                onChange={this.handleCheckBox(nom)}
                disabled={this.disableCheck(nom)}
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
            <ModalHeader toggle={this.toggleModal}>Examen</ModalHeader>
            <ModalBody>
              <LocalForm
                onSubmit={(values) => this.handleExam(values, this.state)}
              >
                <Row className="form-group">
                  <Label htmlFor="Name" md={4}>
                    Date de l'exam
                  </Label>
                  <Col md={6}>
                    <TimePickers />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="Name" md={5}>
                    Nom du cours
                  </Label>
                  <Col md={6}>
                    {this.state.courses.map((cours) => (
                      <div onChange={this.handleRadio}>
                        <input
                          type="radio"
                          checked={this.state.nomCours === cours.nom}
                          value={cours.nom}
                          name="cours"
                          disabled={this.disableRadio(cours.nom)}
                        />{" "}
                        {cours.nom}
                      </div>
                    ))}
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="Salles" md={5}>
                    Salles
                  </Label>

                  {this.state.nomsSalles.map((nomSalle) => (
                    <>
                      <Checkbox nomSalle={nomSalle} />
                    </>
                  ))}
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
                    message: "Exam supprimé avec succès.",
                    type: "danger",
                  }}
                />
              </div>
              <Card className={"border border-dark bg-light text-black"}>
                <Card.Header>
                  <FontAwesomeIcon icon={faList} />
                  {""}
                  <strong className="head"> Liste des Exams</strong>
                  <Can
                    role={user.role}
                    perform="exam:add"
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
                      </div>
                    )}
                  />
                </Card.Header>
                <Card.Body>
                  <Paper>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <strong>Date d'examen</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Matière</strong>
                          </TableCell>
                          <TableCell>
                            <strong>Salles</strong>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.examens.length === 0 ? (
                          <TableRow align="center">
                            <TableCell colSpan="6">
                              Aucun exam disponible.
                            </TableCell>
                          </TableRow>
                        ) : (
                          this.state.examens.map((exam) => (
                            <Can
                              role={user.role}
                              perform="exam:view"
                              data={{
                                userId: this.choisiretudiant(
                                  user.name,
                                  exam.cours.nom
                                ),
                                postOwnerId:exam.cours.nom
                              }}
                              yes={() => (
                                <TableRow key={exam.id}>
                                  <TableCell>{exam.dateExam}</TableCell>
                                  <TableCell>{exam.cours.nom}</TableCell>
                                  <TableCell>
                                    {exam.sallesExamen.map((salleExam) => (
                                      <>
                                        <TableCell>
                                          {salleExam.salle.nom}
                                        </TableCell>
                                      </>
                                    ))}
                                  </TableCell>
                                  <Can
                                    role={user.role}
                                    perform="exam:edit"
                                    data={{
                                      userId: user.name,
                                      postOwnerId:
                                        exam.cours.professeur.prenom +
                                        " " +
                                        exam.cours.professeur.nom,
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
                                              exam,
                                              exam.cours.nom
                                            )}
                                            startIcon={<EditIcon />}
                                          >
                                            modifier
                                          </Button>
                                          <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={this.deleteExam.bind(
                                              this,
                                              exam
                                            )}
                                            startIcon={<DeleteIcon />}
                                          >
                                            supprimer
                                          </Button>
                                        </ButtonGroup>
                                      </TableCell>
                                    )}
                                  />
                                </TableRow>
                              )}
                            />
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
