import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
export default class Navigationbar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/17/Tata_Tamo_Racemo.jpg"
                        width="25" height="25" alt=""/> Magasin
                </Link>
                <Link to={"listSalles"} className="nav-link">
                    Liste des salles
                </Link>
                <Link to={"listExam"} className="nav-link">
                    Liste des examens
                </Link>
                <Link to={"listCours"} className="nav-link">
                    Liste des cours
                </Link>
                <Link to={"listProfs"} className="nav-link">
                    Liste des professeurs
                </Link>
                <Link to={"listEtuds"} className="nav-link">
                    Liste des etudiants
                </Link>
            </Navbar>
        );
    }
}
