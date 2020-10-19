import React from "react";
import { NavbarBrand, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "../css/Navbar.css";
import { Paper } from "@material-ui/core";
import { AuthConsumer } from "../authContext";
import Login from "../components/Login";
import Avatar from 'react-avatar';
import Logout from "../components/Logout";
import Can from "../components/Can";
import  UserAvatar from 'react-user-avatar'
import { slide as Menu } from 'react-burger-menu'
import '../css/stylesidebar.css'
export default class Navigationbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { Tab: "", isOpen: false };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  /**
   * Sets active tab
   */
  setActiveTab = (tab, e) => {
    this.setState({ Tab: tab });
  };
  
  render() {
    return (
      
      <Paper>
      <AuthConsumer>
      {({ authenticated, user}) =>(
                       authenticated ? (


      <Menu itemListElement="div" >
      <div className="ml-5 align-self-center">
      <br/>
      
      <UserAvatar size="80" src={user.picture} name={user.name} color="#FFF" />
      <br/>
     

      <h4>{user.name}</h4>
      <p >{(user.role==="admin")?("Coordinateur"):(user.role)
      
      } 
      </p>
      </div>
    </Menu>):(<empty/>)
      )}
    </AuthConsumer>
      
        <Navbar variant="light" bg="light" collapseOnSelect expand="lg">
          <NavbarBrand href="/#" className="ml-7 logo">
          
            <img
              alt="Miola Exam"
              src={require("../images/logo.png")}
              width="40"
              height="30"
              className="logot d-inline-block align-top"
            />{" "}
            MIOLA Exam
          </NavbarBrand>
          <Nav className="ml-auto">
            <AuthConsumer>
              {({ authenticated, user}) =>
                authenticated ? (
                    
                  <>
                  <Can
                  role={user.role}
                  perform="listsalle:edit"
                  data={{
                    userId: user.id,
                  }}
                  yes={() => (
                    <Nav.Link className="linko">
                    <Link to={"listSalles"} className="nav-link">
                      Salles
                    </Link>
                  </Nav.Link>
                  )}
                />
                   <Can
                  role={user.role}
                  perform="listetudiant:edit"
                  data={{
                    userId: user.id,
                  }}
                  yes={() => (
                    <Nav.Link className="linko">
                    <Link to={"listEtuds"} className="nav-link">
                      Etudiants
                    </Link>
                  </Nav.Link>
                )}
                />
                 <Can
                  role={user.role}
                  perform="posts:edit"
                  data={{
                    userId: user.id,
                  }}
                  yes={() => (
                    <Nav.Link className="linko">
                    <Link to={"listProfs"} className="nav-link">
                      Professeurs
                    </Link>
                  </Nav.Link>
                )}
                />
                    <Nav.Link className="linko">
                      <Link to={"listExam"} className="nav-link">
                        Examens
                      </Link>
                    </Nav.Link>
                    <Nav.Link className="linko">
                      <Link to={"listCours"} className="nav-link">
                        Cours
                      </Link>
                    </Nav.Link>
                    
                  
                    <Nav.Link className="linko">
                      <Link to={"listResultats"} className="nav-link">
                        Liste des résultats
                      </Link>


                    </Nav.Link>
                    
              
                   
                    
                    <div
                      className={
                        this.state.isOpen ? "nav-button" : "nav-button ml-auto"
                      }
                    >
                      <Nav.Link className="nav navbar-nav navbar-left">
                        <Logout />
                       

                      </Nav.Link>
                    </div>
                  </>
                ) : (
                  <div
                    className={
                      this.state.isOpen ? "nav-button" : "nav-button ml-auto"
                    }
                  >
                    <Nav.Link className="nav navbar-nav navbar-left">
                      <Login />
                    </Nav.Link>
                   

                  </div>
                  
                )
              }
            </AuthConsumer>
          </Nav>
        </Navbar>
      </Paper>
    );
  }
}

