
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Service from  './Service'
import footer from './footer'

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {

        return (
            <React.Fragment>
            <div className="container-fluid">
                <section className="section section-lg bg-get-start">
                    <div className="bg-overlay"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2 text-center">
                                <h1 className="get-started-title text-white">MIOLA Exam</h1>
                                <div className="section-title-border margin-t-20 bg-white"></div>
                                <p className="section-subtitle font-secondary text-white text-center padding-t-30">Gérer vos examens , vos Cours , vos étudiants  ...l'effort ne s'arrète pas!  </p>
                                <Link to="#" onClick={evt => {  evt.preventDefault(); } } className="btn btn-bg-white waves-effect margin-t-20">Bienvenue <i className="mdi mdi-arrow-right"></i> </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Service/>
               
                </div>
                

            </React.Fragment >
        );
    }
}

export default Home;


