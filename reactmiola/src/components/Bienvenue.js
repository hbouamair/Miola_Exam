import React from 'react';
import {Jumbotron} from 'react-bootstrap';
export default class Bienvenue extends React.Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
            <h1>Bienvenue</h1>
            <blockquote className= "blockquote mb-0">
            <p>
            La gestion n'a jamais été si facile.
            </p>
            <footer className="blockquote-footer">
            Master MIOLA
            </footer>
            </blockquote>
          </Jumbotron>
            );
        }
    }
